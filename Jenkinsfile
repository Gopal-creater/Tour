pipeline {
    agent any
    stages {
        stage("checkout") {
            steps{
                //Clone the github repo
                checkout scm
            }
        }

        stage("build"){
            steps {
                npm i
                npm run build
            }
        }
    }
}