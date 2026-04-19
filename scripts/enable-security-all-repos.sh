#!/usr/bin/env bash
# Enable Dependabot security updates + secret scanning on every non-archived
# repo owned by $1 (default: drunkenberger). Correct order:
#   1. PUT /vulnerability-alerts     (Dependabot alerts detection)
#   2. PUT /automated-security-fixes (auto-PRs for patches — requires #1 ON)
#   3. PATCH secret_scanning (public repos only — requires GHAS on private)
#
# Usage:  bash scripts/enable-security-all-repos.sh [owner]
set -u

OWNER="${1:-drunkenberger}"

mapfile -t REPOS < <(gh repo list "$OWNER" --limit 200 --json name,isArchived,visibility --jq '.[] | select(.isArchived == false) | "\(.name)\t\(.visibility)"')

printf "Processing %d non-archived repos in %s\n\n" "${#REPOS[@]}" "$OWNER"

FULL=0
DEP_ONLY=0
FAIL=0

for line in "${REPOS[@]}"; do
  NAME="${line%%$'\t'*}"
  VIS="${line##*$'\t'}"
  printf "%-42s %-8s " "$NAME" "$VIS"

  # Step 1: enable Dependabot alerts (required before auto-fixes)
  gh api --method PUT "repos/${OWNER}/${NAME}/vulnerability-alerts" >/dev/null 2>&1
  # Step 2: enable auto-security PRs
  gh api --method PUT "repos/${OWNER}/${NAME}/automated-security-fixes" >/dev/null 2>&1

  # Step 3: secret scanning (public only — GHAS required for private)
  if [[ "$VIS" == "PUBLIC" ]]; then
    gh api --method PATCH "repos/${OWNER}/${NAME}" \
      -f 'security_and_analysis[secret_scanning][status]=enabled' \
      -f 'security_and_analysis[secret_scanning_push_protection][status]=enabled' >/dev/null 2>&1
  fi

  # Verify — use GET on dependabot/alerts as proof alerts are on, and
  # security_and_analysis for public secret-scan status.
  DEP_ON=0
  if gh api "repos/${OWNER}/${NAME}/dependabot/alerts?per_page=1" >/dev/null 2>&1; then
    DEP_ON=1
  fi

  SCAN_ON=0
  if [[ "$VIS" == "PUBLIC" ]]; then
    STATUS=$(gh api "repos/${OWNER}/${NAME}" --jq '.security_and_analysis.secret_scanning.status' 2>/dev/null)
    [[ "$STATUS" == "enabled" ]] && SCAN_ON=1
  fi

  if [[ "$VIS" == "PUBLIC" ]]; then
    if [[ $DEP_ON -eq 1 && $SCAN_ON -eq 1 ]]; then
      echo "✅ deps + secret-scan"
      FULL=$((FULL+1))
    elif [[ $DEP_ON -eq 1 ]]; then
      echo "⚠️  deps only (scan failed)"
      DEP_ONLY=$((DEP_ONLY+1))
    else
      echo "❌ failed"
      FAIL=$((FAIL+1))
    fi
  else
    if [[ $DEP_ON -eq 1 ]]; then
      echo "✅ deps (scan needs GHAS)"
      DEP_ONLY=$((DEP_ONLY+1))
    else
      echo "❌ failed"
      FAIL=$((FAIL+1))
    fi
  fi
done

printf "\nSummary: %d fully protected (public), %d dependabot-only, %d failed\n" "$FULL" "$DEP_ONLY" "$FAIL"
