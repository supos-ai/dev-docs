pipeline {
    agent any
    stages {
        stage("Change Mod"){
            steps {
                chmod -R 755 ./jenkins
            }
        }
        stage('Build') {
            steps {
              sh "./jenkins/build.sh"
            }
        }
        
    }
}
