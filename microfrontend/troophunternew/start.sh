#!/bin/sh
# Start troophunter (static build)
cd /app/microfrontend/troophunter
npm run production &

# Start troophunter-landing (dev server)
cd /app/microfrontend/troophunter-landing
npm run development &

# Wait for both background processes
wait -n