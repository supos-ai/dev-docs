properties([pipelineTriggers([githubPush()])])

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
                checkout scmGit(
                    branches: [[name: "main"]],
                    extensions: [],
                    userRemoteConfigs:[[url: "https://github.com/supos-ai/dev-docs.git"]]
                )
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
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: true,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: '/www/supos-docs',
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
