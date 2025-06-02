#!/bin/bash

echo "🚨 Emergency Disk Space Cleanup"
echo "==============================="
echo ""

# Check current disk usage
echo "📊 Current Disk Usage:"
df -h
echo ""

# Quick Docker cleanup (no confirmation needed)
echo "🐳 Emergency Docker Cleanup..."
echo ""

echo "Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null || true

echo "Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || true

echo "Removing all images..."
docker rmi $(docker images -aq) 2>/dev/null || true

echo "Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

echo "Removing all networks..."
docker network prune -f 2>/dev/null || true

echo "Removing build cache..."
docker builder prune -a -f 2>/dev/null || true

echo "Complete system cleanup..."
docker system prune -a --volumes -f 2>/dev/null || true

echo ""
echo "🗑️ System Cleanup..."

# Clean logs
echo "Cleaning system logs..."
sudo journalctl --vacuum-time=1d 2>/dev/null || true

# Clean package cache
if command -v apt &> /dev/null; then
    echo "Cleaning apt cache..."
    sudo apt clean 2>/dev/null || true
    sudo apt autoclean 2>/dev/null || true
    sudo apt autoremove -y 2>/dev/null || true
fi

# Clean temp files
echo "Cleaning temp files..."
sudo rm -rf /tmp/* 2>/dev/null || true
sudo rm -rf /var/tmp/* 2>/dev/null || true

# Clean old log files
echo "Cleaning old log files..."
sudo find /var/log -type f -name "*.log" -mtime +7 -delete 2>/dev/null || true
sudo find /var/log -type f -name "*.log.*" -delete 2>/dev/null || true

echo ""
echo "📊 Disk Usage After Cleanup:"
df -h
echo ""

echo "🔄 Restarting Docker..."
sudo systemctl restart docker

echo ""
echo "✅ Emergency cleanup completed!"
echo ""
echo "🚀 Next steps:"
echo "1. Wait for Docker to restart"
echo "2. Retry Jenkins deployment"
echo "3. If still failing, run: ./cleanup-server.sh for detailed cleanup"