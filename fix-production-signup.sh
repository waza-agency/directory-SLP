#!/bin/bash

echo "🚨 FIXING PRODUCTION SIGNUP 500 ERROR"
echo "====================================="

# Set error handling
set -e

# Check if we have required environment variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Environment variables not set. Loading from .env..."

    # Load from .env file
    if [ -f ".env" ]; then
        export $(cat .env | grep -v '^#' | xargs)
        echo "✅ Environment variables loaded from .env"
    else
        echo "💥 No .env file found!"
        exit 1
    fi
fi

echo "🔍 Environment Check:"
echo "   NODE_ENV: ${NODE_ENV}"
echo "   SUPABASE_URL: ${NEXT_PUBLIC_SUPABASE_URL:0:50}..."
echo "   SUPABASE_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:50}..."

# Ensure NODE_ENV is production
if [ "$NODE_ENV" != "production" ]; then
    echo "⚠️  NODE_ENV is not 'production'. Setting to production..."
    export NODE_ENV=production

    # Update .env file
    sed -i.bak 's/NODE_ENV=development/NODE_ENV=production/' .env
    echo "✅ Updated NODE_ENV to production in .env file"
fi

# Function to stop and restart the application
restart_app() {
    echo "🔄 Restarting application..."

    # Try Docker Compose first
    if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
        echo "📦 Using Docker Compose..."
        docker compose down || true
        docker compose up -d --build

        # Wait for health check
        echo "⏳ Waiting for application to restart..."
        sleep 15

        for i in {1..20}; do
            if curl -f http://localhost:3007/health &>/dev/null; then
                echo "✅ Application restarted successfully!"
                return 0
            fi
            echo "Attempt $i: Waiting for application..."
            sleep 3
        done

        echo "❌ Application failed to restart with Docker Compose"
        return 1

    elif docker ps | grep -q "sanluisway-app"; then
        echo "🐳 Using regular Docker..."
        docker stop sanluisway-app || true
        docker rm sanluisway-app || true

        # Build and start
        docker build -t sanluisway:latest .
        docker run -d \
            --name sanluisway-app \
            -p 3007:3007 \
            --env-file .env \
            --restart unless-stopped \
            sanluisway:latest

        echo "⏳ Waiting for application to restart..."
        sleep 15

        for i in {1..20}; do
            if docker exec sanluisway-app wget --no-verbose --tries=1 --spider http://localhost:3007/health 2>/dev/null; then
                echo "✅ Application restarted successfully!"
                return 0
            fi
            echo "Attempt $i: Waiting for application..."
            sleep 3
        done

        echo "❌ Application failed to restart with Docker"
        return 1
    else
        echo "⚠️  No Docker containers found. Manual restart needed."
        echo "📝 Please restart your application manually:"
        echo "   - If using Docker: run ./deploy-production.sh"
        echo "   - If using PM2: pm2 restart all"
        echo "   - If using regular node: restart your server"
        return 1
    fi
}

# Function to test the fix
test_signup() {
    echo "🧪 Testing signup functionality..."

    # Test the signup page
    echo "Testing signup page..."
    if curl -f -s https://sanluisway.com/signup > /dev/null; then
        echo "✅ Signup page loads successfully"
    else
        echo "❌ Signup page still returns 500 error"
        return 1
    fi

    # Test the debug endpoint
    echo "Testing debug endpoint..."
    response=$(curl -s https://sanluisway.com/api/debug-signup)
    if echo "$response" | grep -q '"environment"'; then
        echo "✅ Debug endpoint working"

        # Check environment variables
        if echo "$response" | grep -q '"hasSupabaseUrl":true'; then
            echo "✅ Supabase URL detected in production"
        else
            echo "❌ Supabase URL missing in production"
            return 1
        fi

        if echo "$response" | grep -q '"hasAnonKey":true'; then
            echo "✅ Supabase Key detected in production"
        else
            echo "❌ Supabase Key missing in production"
            return 1
        fi
    else
        echo "❌ Debug endpoint still failing"
        return 1
    fi

    echo "🎉 All tests passed!"
    return 0
}

# Main execution
main() {
    echo "🚀 Starting production signup fix..."

    # Try to restart the application
    if restart_app; then
        echo "✅ Application restarted successfully"

        # Wait a bit more for full startup
        sleep 10

        # Test the fix
        if test_signup; then
            echo ""
            echo "🎉 SUCCESS! Production signup error has been fixed!"
            echo "✅ Signup page is now working at: https://sanluisway.com/signup"
            echo ""
            echo "🔍 What was fixed:"
            echo "   • NODE_ENV changed from 'development' to 'production'"
            echo "   • Environment variables properly loaded"
            echo "   • Application restarted with correct configuration"
            echo ""
            echo "📝 Next steps:"
            echo "   • Test signup functionality manually"
            echo "   • Monitor application logs for any other issues"
            echo "   • Verify all environment variables are correctly set"
        else
            echo ""
            echo "⚠️  Application restarted but signup still has issues."
            echo "🔍 Additional debugging needed:"
            echo "   • Check application logs: docker logs sanluisway-app"
            echo "   • Verify environment variables: docker exec sanluisway-app env"
            echo "   • Test individual API endpoints"
        fi
    else
        echo ""
        echo "❌ Failed to restart application automatically."
        echo "🔧 Manual restart required:"
        echo "   1. Stop current application"
        echo "   2. Ensure .env file has NODE_ENV=production"
        echo "   3. Restart with: ./deploy-production.sh"
        echo "   4. Test: curl https://sanluisway.com/signup"
    fi
}

# Run the main function
main "$@"