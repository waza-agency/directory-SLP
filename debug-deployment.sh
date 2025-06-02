#!/bin/bash

echo "=== SanLuisWay Deployment Debug Script ==="
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    echo "Environment variables count: $(cat .env | grep -v '^#' | grep -v '^$' | wc -l)"
    echo ""
    echo "Key environment variables status:"
    echo "- NEXT_PUBLIC_SUPABASE_URL: $(grep -q 'NEXT_PUBLIC_SUPABASE_URL=' .env && echo '✅ Set' || echo '❌ Missing')"
    echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY: $(grep -q 'NEXT_PUBLIC_SUPABASE_ANON_KEY=' .env && echo '✅ Set' || echo '❌ Missing')"
    echo "- SUPABASE_SERVICE_ROLE_KEY: $(grep -q 'SUPABASE_SERVICE_ROLE_KEY=' .env && echo '✅ Set' || echo '❌ Missing')"
    echo "- STRIPE_SECRET_KEY: $(grep -q 'STRIPE_SECRET_KEY=' .env && echo '✅ Set' || echo '❌ Missing')"
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

        # Check container resource usage
        echo ""
        echo "=== Container Resource Usage ==="
        docker stats sanluisway-app --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}"

        # Show container logs (last 30 lines)
        echo ""
        echo "=== Recent Container Logs ==="
        docker logs --tail 30 sanluisway-app

        # Test connection to container directly
        echo ""
        echo "=== Container Network Test ==="
        if docker exec sanluisway-app wget --no-verbose --tries=1 --spider http://localhost:3007/health 2>/dev/null; then
            echo "✅ Health endpoint responding inside container"
        else
            echo "❌ Health endpoint not responding inside container"
        fi

    else
        echo "❌ sanluisway-app container is not running"

        # Check if container exists but stopped
        if docker ps -a | grep -q "sanluisway-app"; then
            echo "📋 Container exists but stopped. Recent logs:"
            docker logs --tail 20 sanluisway-app

            echo ""
            echo "Container exit information:"
            docker inspect sanluisway-app --format='Exit Code: {{.State.ExitCode}}, Error: {{.State.Error}}, Started: {{.State.StartedAt}}, Finished: {{.State.FinishedAt}}'
        fi
    fi

    # Show all Docker containers for context
    echo ""
    echo "=== All Docker Containers ==="
    docker ps -a

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

        # Test nginx configuration
        echo "Testing nginx configuration:"
        nginx -t 2>&1 | head -5
    else
        echo "❌ Nginx is not running"
    fi
else
    echo "⚠️  Nginx command not found (might be running as service)"

    # Check if nginx is running as systemd service
    if systemctl is-active --quiet nginx 2>/dev/null; then
        echo "✅ Nginx is running as systemd service"
    else
        echo "❌ Nginx is not running"
    fi
fi

echo ""

# Test health endpoint from multiple perspectives
echo "=== Health Check Tests ==="

# Test direct connection to app
if curl -f -m 5 http://localhost:3007/health 2>/dev/null; then
    echo "✅ App health endpoint responding on localhost:3007"
    echo "Response: $(curl -s http://localhost:3007/health)"
else
    echo "❌ App health endpoint not responding on localhost:3007"
fi

# Test through nginx
if curl -f -m 5 http://localhost/health 2>/dev/null; then
    echo "✅ Health endpoint responding through nginx (port 80)"
else
    echo "❌ Health endpoint not responding through nginx (port 80)"
fi

# Test HTTPS if available
if curl -f -k -m 5 https://localhost/health 2>/dev/null; then
    echo "✅ Health endpoint responding through nginx HTTPS"
else
    echo "❌ Health endpoint not responding through nginx HTTPS"
fi

echo ""

# Check if port 3007 is being used
echo "=== Port Check ==="
if command -v lsof &> /dev/null; then
    if lsof -i :3007 2>/dev/null; then
        echo "✅ Port 3007 is in use:"
        lsof -i :3007
    else
        echo "❌ Nothing listening on port 3007"
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tlnp | grep :3007; then
        echo "✅ Port 3007 is in use"
    else
        echo "❌ Nothing listening on port 3007"
    fi
else
    echo "⚠️  Cannot check port usage (lsof and netstat not available)"
fi

echo ""

# Check system resources
echo "=== System Resources ==="
echo "Available memory:"
free -h 2>/dev/null || echo "free command not available"

echo ""
echo "Disk usage:"
df -h . 2>/dev/null || echo "df command not available"

echo ""
echo "=== Debug Complete ==="
echo ""
echo "🔧 Common Issues & Solutions:"
echo ""
echo "If you're still getting 502 errors:"
echo ""
echo "1. 📋 Environment Variables:"
echo "   - Ensure .env file has all required Supabase credentials"
echo "   - Check that Jenkins is loading the .env file correctly"
echo ""
echo "2. 🐳 Docker Issues:"
echo "   - If container is unhealthy: docker restart sanluisway-app"
echo "   - If container keeps exiting: check logs above for error details"
echo "   - If container won't start: try rebuilding with: docker build -t sanluisway ."
echo ""
echo "3. 🌐 Nginx Issues:"
echo "   - Reload nginx config: sudo nginx -s reload"
echo "   - Test nginx config: sudo nginx -t"
echo "   - Check nginx logs: sudo tail -f /var/log/nginx/error.log"
echo ""
echo "4. 🔌 Port/Network Issues:"
echo "   - Ensure port 3007 isn't blocked by firewall"
echo "   - Check if another service is using port 3007"
echo "   - Verify nginx is proxying to correct port"
echo ""
echo "5. 📦 Quick Restart Commands:"
echo "   docker restart sanluisway-app && sudo systemctl reload nginx"