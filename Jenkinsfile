pipeline {
    agent any   // Run on a Windows agent

    stages {
        stage('Clean Old Reports') {
            steps {
                bat '''
                    if exist "%WORKSPACE%\\report\\" (
                        echo Cleaning old artifacts...
                        rmdir /s /q "%WORKSPACE%\\report\\"
                    )
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Install Playwright') {
            steps {
                bat 'call npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'call npm run test:psy-val'
            }
        }
    }

    post {
        always {
            // Archive reports if generated
            archiveArtifacts artifacts: 'report/**', fingerprint: true
        }
    }
}
