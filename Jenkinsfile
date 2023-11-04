pipeline {
    agent any
    stages {
        stage("Clean") {
             steps {
                cleanWs()
            }
        }
        stage("Checkout Code"){
            steps{
                git branch: 'main', url: 'https://github.com/supos-ai/dev-docs.git'
            }
        }
        stage('Build') {
            steps {
                nodejs('node-v18') {
                    sh "npm ci"
                    sh "npm run build"
                }
            }
        }
        stage("Publish"){
            steps{
                sshPublisher(publishers:
                    [sshPublisherDesc(
                        configName: 'tengxunyun',
                        sshCredentials: [
                            encryptedPassphrase: '{AQAAABAAAAAQStDVEYs57k2NaBGbow4fHi3yOtjKAxBrkH+0gI8CllY=}',
                            key: '',
                            keyPath: '',
                            username: 'ubuntu'
                        ],
                        transfers: [
                            sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: 'rm -rf /home/ubuntu/test',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: '/home/ubuntu/test',
                                remoteDirectorySDF: false,
                                removePrefix: 'dist',
                                sourceFiles: 'dist/**'
                            )],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false
                        )
                    ]
                )
            }
        }
    }
}
