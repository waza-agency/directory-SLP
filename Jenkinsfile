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

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t \${DOCKER_IMAGE}:\${BUILD_NUMBER} ."
                    sh "docker tag \${DOCKER_IMAGE}:\${BUILD_NUMBER} \${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh "docker stop \${CONTAINER_NAME} || true"
                    sh "docker rm \${CONTAINER_NAME} || true"

                    // Run the new container with environment variables
                    sh """
                        docker run -d \\
                            --name \${CONTAINER_NAME} \\
                            -p \${PORT}:\${PORT} \\
                            -e NODE_ENV=production \\
                            -e PORT=\${PORT} \\
                            -e NEXT_PUBLIC_SITE_URL=https://sanluisway.com \\
                            --env-file .env \\
                            --restart unless-stopped \\
                            \${DOCKER_IMAGE}:latest
                    """

                    // Wait for health check with better error handling
                    sh """
                        echo 'Waiting for container to start...'
                        sleep 10

                        for i in {1..30}; do
                            if docker exec \${CONTAINER_NAME} wget --no-verbose --tries=1 --spider http://localhost:\${PORT}/health 2>/dev/null; then
                                echo 'Service is up! Checking production mode...'
                                HEALTH_RESPONSE=\$(docker exec \${CONTAINER_NAME} wget -qO- http://localhost:\${PORT}/health 2>/dev/null || echo 'failed')
                                echo "Health response: \$HEALTH_RESPONSE"

                                if echo "\$HEALTH_RESPONSE" | grep -q '"environment":"production"'; then
                                    echo '✅ Service is running in production mode!'
                                    exit 0
                                else
                                    echo '⚠️  Service is up but not in production mode'
                                    echo "Response: \$HEALTH_RESPONSE"
                                fi
                                exit 0
                            fi
                            echo "Attempt \$i: Waiting for service to start..."
                            sleep 5
                        done

                        echo '❌ Service failed to start. Checking logs:'
                        docker logs --tail=50 \${CONTAINER_NAME}

                        echo '🔍 Checking file system in container:'
                        docker exec \${CONTAINER_NAME} ls -la /.next/ 2>/dev/null || echo 'Cannot access .next directory'
                        docker exec \${CONTAINER_NAME} ls -la /app/.next/ 2>/dev/null || echo 'Cannot access /app/.next directory'

                        exit 1
                    """
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