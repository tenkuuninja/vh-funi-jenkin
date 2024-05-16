pipeline {
    agent any
    
    tools {
        nodejs 'Nodejs 16.20.2'
    }

    stages {
        stage('Checkout') {
          steps {
            script {
               git url: 'https://github.com/tenkuuninja/vh-funi-jenkin', branch: 'release'
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
                // sh 'nohup npx serve -s build 2>&1 &'
                // sh 'npx forever start -c "npx serve -s build"'
                sh "nohup npx serve -s build -l 3000 2>&1 &"
            }
        }
    }
}
