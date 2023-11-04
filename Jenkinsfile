pipeline {
    agent any
    stages {
        stage("Change Mod"){
            steps {
                sh "chmod -R 755 ./jenkins"
            }
        }
        stage('Build') {
            steps {
                nodejs('node-v18') {
                    npm -v
                }
            }
        }
        
    }
}
