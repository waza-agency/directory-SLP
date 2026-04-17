/**
 * Parse San Luis Way fact-check markdown reports into structured data.
 * The markdown format is conventional — see any file in /public/factchecks/*.md.
 *
 * Output is consumed by the fact-check detail page to render GEO-friendly
 * summaries and to emit Google-compliant ClaimReview JSON-LD (one entry
 * per claim, as Google requires) plus CollectionPage schema on the index.
 */

export type VerdictCode =
  | 'TRUE'
  | 'PARTIALLY_TRUE'
  | 'FALSE'
  | 'UNVERIFIABLE'
  | 'OUTDATED'
  | 'MISLEADING';

export interface ParsedClaim {
  id: string;
  number: number;
  heading: string;
  text: string;
  verdict: VerdictCode;
  verdictLabel: string;
  rating: number;
  summary: string;
  sources: { label: string; url: string }[];
  confidence: 'High' | 'Medium' | 'Low' | 'Unknown';
  confidenceNote: string;
}

export interface ParsedReport {
  title: string;
  articleUrl: string;
  verificationDate: string;
  verificationDateISO: string;
  reliabilityScore: string;
  reliabilityScoreNumeric: number;
  confidenceLevel: string;
  totalClaims: number;
  trueCount: number;
  partiallyTrueCount: number;
  falseCount: number;
  unverifiableCount: number;
  outdatedCount: number;
  claims: ParsedClaim[];
  executiveSummary: string;
}

const VERDICT_MAP: Record<string, { code: VerdictCode; label: string; rating: number }> = {
  'TRUE': { code: 'TRUE', label: 'True', rating: 5 },
  'PARTIALLY TRUE': { code: 'PARTIALLY_TRUE', label: 'Partially True', rating: 3 },
  'FALSE': { code: 'FALSE', label: 'False', rating: 1 },
  'UNVERIFIABLE': { code: 'UNVERIFIABLE', label: 'Unverifiable', rating: 0 },
  'OUTDATED': { code: 'OUTDATED', label: 'Outdated', rating: 2 },
  'MISLEADING': { code: 'MISLEADING', label: 'Misleading', rating: 2 },
};

function detectVerdict(line: string): { code: VerdictCode; label: string; rating: number } {
  const upper = line.toUpperCase();
  // Order matters — check PARTIALLY TRUE before TRUE so "PARTIALLY TRUE" doesn't match TRUE first
  const order: Array<keyof typeof VERDICT_MAP> = [
    'PARTIALLY TRUE',
    'UNVERIFIABLE',
    'MISLEADING',
    'OUTDATED',
    'FALSE',
    'TRUE',
  ];
  for (const key of order) {
    if (upper.includes(key)) return VERDICT_MAP[key];
  }
  return { code: 'UNVERIFIABLE', label: 'Unverifiable', rating: 0 };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function toISODate(human: string): string {
  if (!human) return '';
  const trimmed = human.trim();
  // Already ISO?
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  // "December 12, 2025" or "Dec 12, 2025"
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }
  return '';
}

function extractSources(evidenceBlock: string): { label: string; url: string }[] {
  const sources: { label: string; url: string }[] = [];
  // Match markdown links: [Label](URL)
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(evidenceBlock)) !== null) {
    sources.push({ label: match[1].trim(), url: match[2].trim() });
  }
  // Also catch bare URLs
  const bareUrl = /(?:^|\s)(https?:\/\/[^\s)]+)/g;
  while ((match = bareUrl.exec(evidenceBlock)) !== null) {
    const url = match[1].trim();
    if (!sources.some((s) => s.url === url)) {
      sources.push({ label: url, url });
    }
  }
  return sources;
}

function extractConfidence(text: string): { level: ParsedClaim['confidence']; note: string } {
  const m = text.match(/\*\*CONFIDENCE:\*\*\s*(High|Medium|Low)\s*(?:[—\-–:]?\s*([\s\S]*?))?(?=\n\n|\n---|$)/i);
  if (!m) return { level: 'Unknown', note: '' };
  const level = (m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase()) as ParsedClaim['confidence'];
  return { level, note: (m[2] || '').trim() };
}

/**
 * Parse the full markdown report.
 * The parser is tolerant — missing sections produce empty strings rather than errors.
 */
export function parseFactCheck(markdown: string): ParsedReport {
  // Header metadata
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const urlMatch = markdown.match(/\*\*Source Analyzed:\*\*\s*(.+)$/m);
  const dateMatch = markdown.match(/\*\*Verification Date:\*\*\s*(.+)$/m);
  const scoreMatch = markdown.match(/\*\*Overall Reliability Score:\*\*\s*([\d.]+)(?:\s*\/\s*10)?/);
  const confLevelMatch = markdown.match(/\*\*Confidence Level:\*\*\s*(.+?)(?:\n|$)/);
  const totalMatch = markdown.match(/\*\*Total Claims Analyzed\*\*\s*\|\s*(\d+)/);
  const trueMatch = markdown.match(/Verified TRUE\s*\|\s*(\d+)/);
  const partialMatch = markdown.match(/PARTIALLY TRUE\s*\|\s*(\d+)/);
  const falseMatch = markdown.match(/Verified FALSE\s*\|\s*(\d+)/);
  const unverifiableMatch = markdown.match(/UNVERIFIABLE\s*\|\s*(\d+)/);
  const outdatedMatch = markdown.match(/OUTDATED\s*\|\s*(\d+)/);

  const title = titleMatch ? titleMatch[1].replace(/^Fact-Check Investigation Report:\s*/i, '').trim() : 'Fact-Check Report';
  const articleUrl = urlMatch ? urlMatch[1].trim() : '';
  const verificationDate = dateMatch ? dateMatch[1].trim() : '';
  const verificationDateISO = toISODate(verificationDate);

  // Executive summary text (between "## EXECUTIVE SUMMARY" and next "---" or "## ")
  const execSummaryMatch = markdown.match(/##\s+EXECUTIVE SUMMARY\s*\n([\s\S]+?)(?:\n---|\n##\s+)/i);
  const executiveSummary = execSummaryMatch ? execSummaryMatch[1].trim() : '';

  // Parse each claim: matches "### CLAIM N: Heading" blocks
  const claims: ParsedClaim[] = [];
  const claimBlockRegex = /###\s+CLAIM\s+(\d+):\s*([^\n]+)\n([\s\S]+?)(?=\n###\s+CLAIM\s+\d+:|\n##\s+|\n---[\s\n]*###\s+CLAIM|\n?$)/gi;
  let claimMatch;
  while ((claimMatch = claimBlockRegex.exec(markdown)) !== null) {
    const [, numStr, heading, body] = claimMatch;
    const number = parseInt(numStr, 10);

    const claimTextMatch = body.match(/\*\*CLAIM:\*\*\s*([\s\S]+?)(?=\n\n|\n\*\*)/);
    const verdictMatch = body.match(/\*\*VERDICT:\*\*\s*([\s\S]+?)(?=\n\n|\n\*\*)/);
    const summaryMatch = body.match(/\*\*INVESTIGATION SUMMARY:\*\*\s*([\s\S]+?)(?=\n\n\*\*|\n\*\*EVIDENCE)/);
    const evidenceMatch = body.match(/\*\*EVIDENCE CHAIN:\*\*\s*([\s\S]+?)(?=\n\n\*\*|\*\*DETAILED|\*\*CONFIDENCE|\*\*CONTEXT|\n---|$)/);

    const verdictLine = verdictMatch ? verdictMatch[1].trim() : '';
    const { code, label, rating } = detectVerdict(verdictLine);
    const claimText = claimTextMatch
      ? claimTextMatch[1].trim().replace(/^["“]|["”]$/g, '').replace(/^\*+|\*+$/g, '').trim()
      : heading.trim();

    const sources = evidenceMatch ? extractSources(evidenceMatch[1]) : [];
    const conf = extractConfidence(body);

    claims.push({
      id: `claim-${number}`,
      number,
      heading: heading.trim(),
      text: claimText,
      verdict: code,
      verdictLabel: label,
      rating,
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      sources,
      confidence: conf.level,
      confidenceNote: conf.note,
    });
  }

  return {
    title,
    articleUrl,
    verificationDate,
    verificationDateISO,
    reliabilityScore: scoreMatch ? `${scoreMatch[1]}/10` : '',
    reliabilityScoreNumeric: scoreMatch ? parseFloat(scoreMatch[1]) : 0,
    confidenceLevel: confLevelMatch ? confLevelMatch[1].trim() : '',
    totalClaims: totalMatch ? parseInt(totalMatch[1], 10) : claims.length,
    trueCount: trueMatch ? parseInt(trueMatch[1], 10) : 0,
    partiallyTrueCount: partialMatch ? parseInt(partialMatch[1], 10) : 0,
    falseCount: falseMatch ? parseInt(falseMatch[1], 10) : 0,
    unverifiableCount: unverifiableMatch ? parseInt(unverifiableMatch[1], 10) : 0,
    outdatedCount: outdatedMatch ? parseInt(outdatedMatch[1], 10) : 0,
    claims,
    executiveSummary,
  };
}

/**
 * Build a Google-compliant ClaimReview JSON-LD object for a single claim.
 * Reference: https://developers.google.com/search/docs/appearance/structured-data/factcheck
 */
export function buildClaimReviewSchema(
  claim: ParsedClaim,
  report: ParsedReport,
  pageUrl: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url: `${pageUrl}#${claim.id}`,
    datePublished: report.verificationDateISO || undefined,
    claimReviewed: claim.text,
    itemReviewed: {
      '@type': 'Claim',
      appearance: report.articleUrl ? { '@type': 'CreativeWork', url: report.articleUrl } : undefined,
      datePublished: report.verificationDateISO || undefined,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: claim.rating,
      bestRating: 5,
      worstRating: 1,
      alternateName: claim.verdictLabel,
    },
    author: {
      '@type': 'Organization',
      name: 'San Luis Way',
      url: 'https://www.sanluisway.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'San Luis Way',
      url: 'https://www.sanluisway.com',
    },
    citation: claim.sources.map((s) => ({
      '@type': 'CreativeWork',
      name: s.label,
      url: s.url,
    })),
  };
}
