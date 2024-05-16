pipeline {
    agent any
    
    tools {
        nodejs 'Nodejs 16.20.2'
    }
  
    when { branch 'release' }

    stages {
        stage('Checkout') {
          steps {
            script {
               git url: 'https://github.com/tenkuuninja/vh-funi-jenkin', branch: 'main'
              }
           }
        }
        stage('Build') {
            steps {
                sh "npm install --legacy-peer-deps"
                sh "npm run build"
            }
        }
        stage('Deploy') {
            steps {
                sh 'nohup npx serve -s build 2>&1 &'
            }
        }
    }
}
