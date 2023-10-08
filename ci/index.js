const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 4999;
const webhookSecret = process.env.WEBHOOK_SECRET || 'your-secret';

app.get('/', (req, res) => {
  console.log('Welcome to the CI!');
  res.send('Welcome to the CI!');
});

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature'];
  const event = req.headers['x-github-event'];
  const body = JSON.stringify(req.body);

  const hmac = crypto.createHmac('sha1', webhookSecret);
  const digest = 'sha1=' + hmac.update(body).digest('hex');

  if (signature === digest) {
    if (event === 'ping') {
      const gitPullProcess = spawn('git', ['pull', 'origin', 'feature/crm'], { cwd: '..' });
      gitPullProcess.stdout.on('data', (data) => {
        console.log(`[GIT] ${data}`);
      });
      gitPullProcess.stderr.on('data', (data) => {
        console.error(`[GIT ERROR] ${data}`);
      });
      gitPullProcess.on('close', (code) => {
        console.log('[GIT] Pulled successfully.');
      });

      // Change to the parent directory (helloabdul) and then run npm run build:dev
      const buildProcess = spawn('npm', ['run', 'build:' + process.env.ENVIRONMENT], { cwd: '..' });
      buildProcess.stdout.on('data', (data) => {
        console.log(`[BUILD] ${data}`);
      });
      buildProcess.stderr.on('data', (data) => {
        console.error(`[BUILD ERROR] ${data}`);
      });
      buildProcess.on('close', (code) => {
        if (code === 0) {
          console.log('[BUILD] Build completed successfully.');

          const stopContainersProcess = spawn('npm', ['run', 'stop:containers'], { cwd: '..' });
          stopContainersProcess.stdout.on('data', (data) => {
            console.log(`[BUILD] ${data}`);
          });
          stopContainersProcess.stderr.on('data', (data) => {
            console.error(`[BUILD ERROR] ${data}`);
          });
          stopContainersProcess.on('close', (code) => {
            console.log('[BUILD] Build completed successfully.');
          });

          const removeContainersProcess = spawn('npm', ['run', 'remove:containers'], { cwd: '..' });
          removeContainersProcess.stdout.on('data', (data) => {
            console.log(`[BUILD] ${data}`);
          });
          removeContainersProcess.stderr.on('data', (data) => {
            console.error(`[BUILD ERROR] ${data}`);
          });
          removeContainersProcess.on('close', (code) => {
            console.log('[BUILD] Build completed successfully.');
          });

          // After the build, start your application with a similar approach
          const startProcess = spawn('npm', ['run', 'start:' + process.env.ENVIRONMENT], { cwd: '..' });
          startProcess.stdout.on('data', (data) => {
            console.log(`[START] ${data}`);
          });
          startProcess.stderr.on('data', (data) => {
            console.error(`[START ERROR] ${data}`);
          });
          startProcess.on('close', (code) => {
            if (code === 0) {
              console.log('[START] Application started successfully.');
            } else {
              console.error('[START ERROR] Application failed to start.');
            }
          });
        } else {
          console.error('[BUILD ERROR] Build failed.');
        }
      });

      const removeImagesProcess = spawn('npm', ['run', 'remove:images'], { cwd: '..' });
      removeImagesProcess.stdout.on('data', (data) => {
        console.log(`[BUILD] ${data}`);
      });
      removeImagesProcess.stderr.on('data', (data) => {
        console.error(`[BUILD ERROR] ${data}`);
      });
      removeImagesProcess.on('close', (code) => {
        console.log('[BUILD] Build completed successfully.');
      });

      res.status(200).send('Build triggered successfully.');
    } else {
      res.status(200).send('Ignoring unsupported event.');
    }
  } else {
    res.status(403).send('Invalid signature.');
  }
});

app.listen(port, () => {
  console.log(`Webhook listener is running on port ${port}`);
});
