#!/bin/bash

echo "=== SanLuisWay Deployment Debug Script ==="
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    echo "Environment variables count: $(cat .env | grep -v '^#' | grep -v '^$' | wc -l)"
else
    echo "❌ .env file missing! Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your actual values"
fi

echo ""

# Check Docker status
echo "=== Docker Status ==="
if command -v docker &> /dev/null; then
    echo "✅ Docker is available"

    # Check if container is running
    if docker ps | grep -q "sanluisway-app"; then
        echo "✅ sanluisway-app container is running"

        # Check container health
        health=$(docker inspect sanluisway-app --format='{{.State.Health.Status}}' 2>/dev/null)
        if [ "$health" = "healthy" ]; then
            echo "✅ Container is healthy"
        else
            echo "⚠️  Container health: $health"
        fi

        # Show container logs (last 20 lines)
        echo ""
        echo "=== Recent Container Logs ==="
        docker logs --tail 20 sanluisway-app

    else
        echo "❌ sanluisway-app container is not running"

        # Check if container exists but stopped
        if docker ps -a | grep -q "sanluisway-app"; then
            echo "📋 Container exists but stopped. Recent logs:"
            docker logs --tail 10 sanluisway-app
        fi
    fi

else
    echo "❌ Docker is not available"
fi

echo ""

# Check if nginx is configured
echo "=== Nginx Status ==="
if command -v nginx &> /dev/null; then
    echo "✅ Nginx is available"
    if pgrep nginx > /dev/null; then
        echo "✅ Nginx is running"
    else
        echo "❌ Nginx is not running"
    fi
else
    echo "⚠️  Nginx command not found (might be running as service)"
fi

echo ""

# Test health endpoint directly
echo "=== Health Check Test ==="
if curl -f http://localhost:3007/health 2>/dev/null; then
    echo "✅ App health endpoint responding on localhost:3007"
else
    echo "❌ App health endpoint not responding on localhost:3007"
fi

echo ""

# Check if port 3007 is being used
echo "=== Port Check ==="
if lsof -i :3007 2>/dev/null; then
    echo "✅ Port 3007 is in use:"
    lsof -i :3007
else
    echo "❌ Nothing listening on port 3007"
fi

echo ""
echo "=== Debug Complete ==="
echo "If you're still getting 502 errors:"
echo "1. Make sure .env file has all required variables"
echo "2. Check Docker container logs above"
echo "3. Verify nginx configuration"
echo "4. Restart both Docker container and nginx"