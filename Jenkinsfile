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

                    // Run the new container
                    sh """
                        docker run -d \\
                            --name \${CONTAINER_NAME} \\
                            -p \${PORT}:\${PORT} \\
                            -e NODE_ENV=production \\
                            -e PORT=\${PORT} \\
                            --restart unless-stopped \\
                            \${DOCKER_IMAGE}:latest
                    """

                    // Wait for health check
                    sh """
                        for i in {1..30}; do
                            if curl -f http://localhost:\${PORT}/health; then
                                echo 'Service is up!'
                                exit 0
                            fi
                            echo 'Waiting for service to start...'
                            sleep 2
                        done
                        echo 'Service failed to start'
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