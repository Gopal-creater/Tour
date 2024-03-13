pipeline {
    agent any
    tools {
        nodejs 'node' // 'node' should match the NodeJS installation name configured in Jenkins
        dockerTool 'docker'
    }

    stages {
        stage("checkout") {
            steps{
                //Clone the github repo
                checkout scm
            }
        }

        stage("build"){
            steps {
               // Jenkins will automatically set up the environment for npm commands
                script {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage("build image"){
            steps {
                script {
                    // Build your Docker image
                    dockerImage = docker.build('gopalgautam/jenkinstest:latest')
                }
            }
        }

        stage("docker push"){
            steps {
                script {
                    // Log in to Docker Hub
                    sh `docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD`
                    
                    // Push the Docker image to Docker Hub
                    dockerImage.push()
                }
            }
        }
    }
}