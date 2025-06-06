#!/bin/bash

echo "🚀 Production Deployment Script"
echo "================================"

# Set error handling
set -e

# Configuration
CONTAINER_NAME="sanluisway-app"
IMAGE_NAME="sanluisway"
PORT=3007

# Function to check if Docker Compose is available
check_docker_compose() {
    if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check if .env file exists
check_env_file() {
    if [ ! -f ".env" ]; then
        echo "❌ .env file not found! Creating from environment variables..."
        cat > .env << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY:-}

# ADsense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=${NEXT_PUBLIC_ADSENSE_CLIENT_ID:-}
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=${NEXT_PUBLIC_ADSENSE_PUBLISHER_ID:-}

# Stripe Configuration
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:-}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET:-}
STRIPE_MONTHLY_PRICE_ID=${STRIPE_MONTHLY_PRICE_ID:-}
STRIPE_YEARLY_PRICE_ID=${STRIPE_YEARLY_PRICE_ID:-}

# Other Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://sanluisway.com}
PORT=3007

# ReCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY:-}
RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY:-}

# SMTP Configuration
SMTP_HOST=${SMTP_HOST:-}
SMTP_PASSWORD=${SMTP_PASSWORD:-}
SMTP_PORT=${SMTP_PORT:-465}
SMTP_USER=${SMTP_USER:-}

# Email Configuration
RESEND_API_KEY=${RESEND_API_KEY:-}
GMAIL_USER=${GMAIL_USER:-}
GMAIL_APP_PASSWORD=${GMAIL_APP_PASSWORD:-}
EOF
        echo "✅ Created .env file from environment variables"
    else
        echo "✅ .env file found"
    fi
}

# Function to deploy with Docker Compose
deploy_with_compose() {
    echo "📦 Deploying with Docker Compose..."

    # Stop existing containers
    echo "🛑 Stopping existing containers..."
    docker compose down || true

    # Build and start
    echo "🔨 Building and starting containers..."
    docker compose up -d --build --force-recreate

    # Wait for health check
    echo "⏳ Waiting for application to start..."
    sleep 10

    for i in {1..30}; do
        if curl -f http://localhost:$PORT/health &>/dev/null; then
            echo "✅ Application is healthy!"
            docker compose ps
            return 0
        fi
        echo "Attempt $i: Waiting for application..."
        sleep 5
    done

    echo "❌ Application failed to start. Checking logs:"
    docker compose logs --tail=50
    return 1
}

# Function to deploy with regular Docker
deploy_with_docker() {
    echo "🐳 Deploying with regular Docker..."

    # Stop and remove existing container
    echo "🛑 Stopping existing container..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true

    # Build image
    echo "🔨 Building Docker image..."
    docker build -t $IMAGE_NAME:latest .

    # Run container
    echo "🚀 Starting container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:$PORT \
        --env-file .env \
        --restart unless-stopped \
        $IMAGE_NAME:latest

    # Wait for health check
    echo "⏳ Waiting for application to start..."
    sleep 10

    for i in {1..30}; do
        if docker exec $CONTAINER_NAME wget --no-verbose --tries=1 --spider http://localhost:$PORT/health 2>/dev/null; then
            echo "✅ Application is healthy!"
            docker ps | grep $CONTAINER_NAME
            return 0
        fi
        echo "Attempt $i: Waiting for application..."
        sleep 5
    done

    echo "❌ Application failed to start. Checking logs:"
    docker logs --tail=50 $CONTAINER_NAME

    echo "🔍 Checking container file system:"
    docker exec $CONTAINER_NAME ls -la /app/.next/ 2>/dev/null || echo "Cannot access .next directory"

    return 1
}

# Main deployment logic
main() {
    echo "🔍 Checking environment..."

    # Ensure we're in the right directory
    if [ ! -f "package.json" ]; then
        echo "❌ package.json not found. Make sure you're in the project directory."
        exit 1
    fi

    # Check and create .env file
    check_env_file

    # Choose deployment method
    if check_docker_compose; then
        echo "📋 Docker Compose detected, using compose deployment"
        deploy_with_compose
    else
        echo "🐳 Using regular Docker deployment"
        deploy_with_docker
    fi

    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "🌐 Application should be available at: http://localhost:$PORT"
        echo "💚 Health check: http://localhost:$PORT/health"
    else
        echo ""
        echo "❌ Deployment failed!"
        exit 1
    fi
}

# Run main function
main "$@"