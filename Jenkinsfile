pipeline {
    agent any
    stages {
        stage("checkout") {
            steps{
                checkout scm
            }
        }

        stage("build"){
            steps {
                sh `npm i`
                sh `npm run build`
            }
        }
    }
}