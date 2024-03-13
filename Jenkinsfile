pipeline {
    agent any
    tools {
        nodejs 'node' // 'node' should match the NodeJS installation name configured in Jenkins
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
    }
}