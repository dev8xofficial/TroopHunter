#!/bin/sh

# Determine which .env file to load
ENVIRONMENT=${NODE_ENV:-development}
ENV_FILE=".env.$ENVIRONMENT"

# ⚠ THE FILE IS A DEFAULT, NOT AN OVERRIDE. THIS ORDER MATTERS MORE THAN IT LOOKS.
#
# This used to be `export $(grep -v '^#' "$ENV_FILE" | xargs)`, which unconditionally
# overwrote the container's environment with the file baked into the image. The effect: NO
# Kubernetes Secret could ever change where this service connects. You could set
# POSTGRES_HOST to anything, watch `printenv` report it correctly inside the pod, and the
# app would still connect to whatever was compiled in.
#
# That is exactly what happened during the 2026-07-31 database migration. Every pod
# reported the new host, every check passed, and all five services were still talking to
# the old in-cluster databases. It was found only by reading this log and noticing it named
# the old host.
#
# Correct precedence is: platform configuration (Kubernetes, docker run -e) beats the
# image's built-in defaults. An image is a template; the environment it runs in decides.
load_defaults() {
  [ -f "$1" ] || return 1
  echo "Loading defaults from $1 (existing environment variables win)"
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in ''|'#'*) continue ;; esac
    key=${line%%=*}
    val=${line#*=}
    case "$key" in *[!A-Za-z0-9_]*|'') continue ;; esac
    # Only set it if it is not already in the environment.
    eval "current=\${$key-}"
    [ -n "$current" ] && continue
    export "$key=$val"
  done < "$1"
  return 0
}

load_defaults "$ENV_FILE" || load_defaults .env || \
  echo "No .env file found for environment: $ENVIRONMENT"

# PostgreSQL connection settings
POSTGRES_HOST=${POSTGRES_HOST:-"auth-dev"} # Use the value from .env or the default if not defined
POSTGRES_PORT=${POSTGRES_PORT:-"5432"}
POSTGRES_DB=${POSTGRES_DB:-"postgres"}
POSTGRES_USER=${POSTGRES_USER:-"postgres"}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-""}
MAX_ATTEMPTS=180
SLEEP_INTERVAL=5
attempts=0

connected=false

while [ $attempts -lt $MAX_ATTEMPTS ]; do
  pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -d $POSTGRES_DB -U $POSTGRES_USER

  # Check the exit code to determine success or failure
  if [ $? -eq 0 ]; then

    echo "Connection to PostgreSQL database is successful. $POSTGRES_HOST $POSTGRES_PORT $POSTGRES_DB $POSTGRES_USER"

    # ⚠ THE MIGRATION MUST NOT BE ABLE TO BLOCK STARTUP. THIS IS NOT DEFENSIVE PADDING.
    #
    # `migrate:$ENVIRONMENT` runs `npx sequelize-cli db:migrate`, and sequelize-cli is NOT
    # a dependency of this service — not in dependencies, not in devDependencies. So npx
    # tries to DOWNLOAD it from registry.npmjs.org on every single start. Pods in this
    # cluster cannot reach the npm registry, so npx does not fail: it retries, forever.
    #
    # The consequence, seen in production on 2026-07-31: the container reported Running and
    # Ready, the Service had an endpoint, and the process never got as far as listening.
    # Every request to /businesses/ returned 503 and the pod looked perfectly healthy. It
    # survived only because nothing had restarted it in months — the restart did not break
    # it, it revealed it.
    #
    # A database migration failing is a thing to report. It is not a reason for the service
    # to never start. The timeout bounds it, the || keeps going, and the message says what
    # happened instead of leaving a silent hang.
    if timeout 120 npm run "migrate:$ENVIRONMENT"; then
      echo "migrations applied"
    else
      echo "WARNING: migrations did not complete (exit $?) - starting the server anyway."
      echo "WARNING: if this is the npx download timing out, sequelize-cli is missing from"
      echo "WARNING: package.json and this container has no route to the npm registry."
    fi

    npm run "$ENVIRONMENT"
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
