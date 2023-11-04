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
              sh "./jenkins/build.sh"
            }
        }
        
    }
}
