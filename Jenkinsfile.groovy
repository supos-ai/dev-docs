pipeline {
    agent any
        stage('Build') {
            steps {
                nodejs('node-v18') {
                   sh "npm ci"
                   sh "npm build"
                }
            }
        }
        stage("Publish"){
            steps{
                sshPublisher(publishers:
                    [sshPublisherDesc(
                        configName: 'tengxunyun',
                        transfers: [
                            sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: 'cd /home/ubuntu/test',
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
