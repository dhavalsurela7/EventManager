pipeline {
  agent any

  environment {
    NETLIFY_SITE_ID = '83d69572-7e81-4384-8f29-c5b7ce5cf55e'
    NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')
  }

  stages {
    stage('Install') {
      steps {
        bat 'npm install -g @angular/cli netlify-cli'
        bat 'npm install --f'
      }
    }

    stage('Build') {
      steps {
        bat 'npx ng build --configuration production'
      }
    }

    stage('Deploy to Netlify') {
      steps {
        bat '''
        npx netlify deploy \
          --dir=dist/EventManager \
          --site=$NETLIFY_SITE_ID \
          --auth=$NETLIFY_AUTH_TOKEN \
          --prod
        '''
      }
    }
  }
}
