#!/bin/sh

# Load environment variables from the .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# PostgreSQL connection settings
POSTGRES_HOST=${POSTGRES_HOST:-"postgres_users_dev"} # Use the value from .env or the default if not defined
POSTGRES_PORT=${POSTGRES_PORT:-"5432"}
POSTGRES_DB=${POSTGRES_DB:-"postgres_dev"}
POSTGRES_USER=${POSTGRES_USER:-"postgres"}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-"mysecretpassword"}
MAX_ATTEMPTS=180
SLEEP_INTERVAL=5
attempts=0

connected=false

while [ $attempts -lt $MAX_ATTEMPTS ]; do
  pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -d $POSTGRES_DB -U $POSTGRES_USER

  # Check the exit code to determine success or failure
  if [ $? -eq 0 ]; then

    echo "Connection to PostgreSQL database is successful. $POSTGRES_HOST $POSTGRES_PORT $POSTGRES_DB $POSTGRES_USER"
    npm run migrate
    npm run dev
    break
  else
    echo "Connection attempt $((attempts + 1)) failed. Retrying in $SLEEP_INTERVAL seconds... $POSTGRES_HOST, $POSTGRES_PORT, $POSTGRES_DB, $POSTGRES_USER"
    sleep $SLEEP_INTERVAL
  fi

  attempts=$((attempts + 1))
done

if [ $attempts -ge $MAX_ATTEMPTS ]; then
  echo "Maximum number of connection attempts reached. Connection to PostgreSQL database failed."
fi
