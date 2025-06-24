pipeline {
    agent any

    environment {
        PORT = '3007'
        DOCKER_IMAGE = 'sanluisway'
        CONTAINER_NAME = 'sanluisway-app'
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'

                // Verify build artifacts are present
                sh '''
                    echo "🔍 Verifying build artifacts..."
                    if [ -f ".next/BUILD_ID" ]; then
                        echo "✅ BUILD_ID exists"
                    else
                        echo "❌ BUILD_ID missing"
                        exit 1
                    fi

                    if [ -f ".next/build-manifest.json" ]; then
                        echo "✅ build-manifest.json exists"
                    else
                        echo "❌ build-manifest.json missing"
                        exit 1
                    fi

                    if [ -f ".next/routes-manifest.json" ]; then
                        echo "✅ routes-manifest.json exists"
                    else
                        echo "❌ routes-manifest.json missing"
                        exit 1
                    fi

                    echo "🎉 Build verification complete!"
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Make the deployment script executable
                    sh "chmod +x deploy-production.sh"

                    // Use Jenkins credentials for sensitive data
                    withCredentials([
                        string(credentialsId: 'SUPABASE_URL', variable: 'NEXT_PUBLIC_SUPABASE_URL'),
                        string(credentialsId: 'SUPABASE_ANON_KEY', variable: 'NEXT_PUBLIC_SUPABASE_ANON_KEY'),
                        string(credentialsId: 'SUPABASE_SERVICE_ROLE_KEY', variable: 'SUPABASE_SERVICE_ROLE_KEY'),
                        string(credentialsId: 'STRIPE_SECRET_KEY', variable: 'STRIPE_SECRET_KEY'),
                        string(credentialsId: 'STRIPE_PUBLISHABLE_KEY', variable: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
                        string(credentialsId: 'STRIPE_WEBHOOK_SECRET', variable: 'STRIPE_WEBHOOK_SECRET'),
                        string(credentialsId: 'RECAPTCHA_SECRET_KEY', variable: 'RECAPTCHA_SECRET_KEY'),
                        string(credentialsId: 'SMTP_PASSWORD', variable: 'SMTP_PASSWORD'),
                        // Email Configuration
                        string(credentialsId: 'RESEND_API_KEY', variable: 'RESEND_API_KEY'),
                        string(credentialsId: 'GMAIL_USER', variable: 'GMAIL_USER'),
                        string(credentialsId: 'GMAIL_APP_PASSWORD', variable: 'GMAIL_APP_PASSWORD')
                    ]) {
                        // Set non-sensitive environment variables
                        withEnv([
                            "NEXT_PUBLIC_ADSENSE_CLIENT_ID=2759148102",
                            "NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=pub-7339948154887436",
                            "STRIPE_MONTHLY_PRICE_ID=price_1RIgQNIg6TQpITo34AVnco2v",
                            "STRIPE_YEARLY_PRICE_ID=price_1RIgTuIg6TQpITo3lX3tScvi",
                            "NODE_ENV=production",
                            "NEXT_PUBLIC_SITE_URL=https://sanluisway.com",
                            "PORT=3007",
                            "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lfe7QArAAAAAN6MoUXr4amBh4t33Epkv0LAox9L",
                            "SMTP_HOST=sanluisway.com",
                            "SMTP_PORT=465",
                            "SMTP_USER=info@sanluisway.com"
                        ]) {
                            // Run the deployment script
                            sh "./deploy-production.sh"
                        }
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Remove old images, keeping the last 5
                    sh """
                        docker images \${DOCKER_IMAGE} --format '{{.ID}} {{.CreatedAt}}' | \\
                        sort -k 2 -r | \\
                        tail -n +6 | \\
                        awk '{print \$1}' | \\
                        xargs -r docker rmi
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
            // Stop and remove failed container if it exists
            sh "docker stop \${CONTAINER_NAME} || true"
            sh "docker rm \${CONTAINER_NAME} || true"
        }
        always {
            // Clean workspace
            cleanWs()
        }
    }
}