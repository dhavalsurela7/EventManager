pipeline {
  agent any

  environment {
    NETLIFY_SITE_ID = '83d69572-7e81-4384-8f29-c5b7ce5cf55e'
    NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install -g @angular/cli netlify-cli'
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'ng build --configuration production'
      }
    }

    stage('Deploy to Netlify') {
      steps {
        sh '''
        netlify deploy \
          --dir=dist/EventManager \
          --site=$NETLIFY_SITE_ID \
          --auth=$NETLIFY_AUTH_TOKEN \
          --prod
        '''
      }
    }
  }
}
