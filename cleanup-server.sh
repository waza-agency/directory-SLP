#!/bin/bash

echo "🧹 SanLuisWay Server Cleanup Script"
echo "=================================="
echo ""

# Check initial disk usage
echo "📊 Initial Disk Usage:"
df -h
echo ""

# Check Docker disk usage
echo "🐳 Docker Disk Usage:"
docker system df
echo ""

# Function to safely remove items with confirmation
cleanup_with_confirmation() {
    local description=$1
    local command=$2
    local space_saved=""

    echo "🗑️  $description"
    read -p "Do you want to proceed? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Executing: $command"
        eval $command
        space_saved=$(df -h / | awk 'NR==2{print $4}')
        echo "✅ Done! Available space: $space_saved"
    else
        echo "⏭️  Skipped"
    fi
    echo ""
}

# Stop running containers first
echo "🛑 Stopping running containers..."
docker ps -q | xargs -r docker stop
echo ""

# Clean up Docker containers
cleanup_with_confirmation "Remove all stopped containers" "docker container prune -f"

# Clean up Docker images
cleanup_with_confirmation "Remove unused Docker images" "docker image prune -a -f"

# Clean up Docker volumes
cleanup_with_confirmation "Remove unused Docker volumes" "docker volume prune -f"

# Clean up Docker networks
cleanup_with_confirmation "Remove unused Docker networks" "docker network prune -f"

# Clean up Docker build cache
cleanup_with_confirmation "Remove Docker build cache" "docker builder prune -a -f"

# Clean up system logs
cleanup_with_confirmation "Clean up system logs (older than 7 days)" "sudo journalctl --vacuum-time=7d"

# Clean up apt cache (if Ubuntu/Debian)
if command -v apt &> /dev/null; then
    cleanup_with_confirmation "Clean up apt package cache" "sudo apt clean && sudo apt autoclean && sudo apt autoremove -y"
fi

# Clean up yum cache (if RHEL/CentOS)
if command -v yum &> /dev/null; then
    cleanup_with_confirmation "Clean up yum package cache" "sudo yum clean all"
fi

# Clean up temp files
cleanup_with_confirmation "Clean up temporary files" "sudo rm -rf /tmp/* /var/tmp/*"

# Clean up log files
cleanup_with_confirmation "Clean up old log files" "sudo find /var/log -type f -name '*.log' -mtime +30 -delete"

# Clean up Jenkins workspace (be careful!)
if [ -d "/var/lib/jenkins/workspace" ]; then
    cleanup_with_confirmation "Clean up old Jenkins build artifacts" "sudo find /var/lib/jenkins/workspace -type f -name '*.log' -mtime +7 -delete"
fi

# Find largest files/directories
echo "📈 Largest directories consuming disk space:"
echo "Top 10 largest directories in /:"
sudo du -h --max-depth=2 / 2>/dev/null | sort -hr | head -10
echo ""

echo "Top 10 largest files in /var:"
sudo find /var -type f -exec du -h {} + 2>/dev/null | sort -hr | head -10
echo ""

# Docker-specific cleanup commands
echo "🐳 Additional Docker cleanup commands you can run manually:"
echo ""
echo "Remove all containers (stopped and running):"
echo "  docker rm -f \$(docker ps -aq)"
echo ""
echo "Remove all images:"
echo "  docker rmi -f \$(docker images -aq)"
echo ""
echo "Complete Docker system cleanup (CAUTION!):"
echo "  docker system prune -a --volumes -f"
echo ""

# Check final disk usage
echo "📊 Final Disk Usage:"
df -h
echo ""

# Check Docker disk usage
echo "🐳 Final Docker Disk Usage:"
docker system df
echo ""

echo "🎉 Cleanup completed!"
echo ""
echo "🚀 To retry deployment after cleanup:"
echo "1. Restart Docker daemon: sudo systemctl restart docker"
echo "2. Trigger Jenkins build manually or push a new commit"
echo "3. Monitor disk space: watch df -h"
echo ""

# Calculate space freed
echo "💾 Disk space analysis:"
echo "Root filesystem usage:"
df -h / | awk 'NR==2{print "Used: " $3 " Available: " $4 " Usage: " $5}'