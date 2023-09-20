pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // Checkout the code from GitHub
        checkout scm
      }
    }

    stage('Build') {
      steps {
        // Build your Docker containers
        sh 'docker compose -f docker-compose.yml build'
      }
    }

    stage('Deploy') {
      steps {
        // Deploy your Docker containers
        sh 'docker compose -f docker-compose.yml up'
      }
    }
  }
}
