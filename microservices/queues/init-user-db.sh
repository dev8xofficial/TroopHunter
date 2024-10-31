#!/bin/bash

# # PostgreSQL connection settings
# DEV_POSTGRES_HOST="postgres"
# DEV_POSTGRES_PORT=5432
# DEV_POSTGRES_DB="postgres-dev"
# DEV_POSTGRES_USER="postgres"
# DEV_POSTGRES_PASSWORD="mysecretpassword"

# PROD_POSTGRES_HOST="postgres"
# PROD_POSTGRES_PORT=5432
# PROD_POSTGRES_DB="postgres-prod"
# PROD_POSTGRES_USER="postgres"
# PROD_POSTGRES_PASSWORD="mysecretpassword"

# # Create the database if it does not exist
# if ! pg_isready -h $DEV_POSTGRES_HOST -p $DEV_POSTGRES_PORT -U $DEV_POSTGRES_USER -d $DEV_POSTGRES_DB; then
#   # Create the database if it doesn't exist
#   echo "$DEV_POSTGRES_DB doesn't exist."
#   psql -h $DEV_POSTGRES_HOST -p $DEV_POSTGRES_PORT -U $DEV_POSTGRES_USER -c "CREATE DATABASE $DEV_POSTGRES_DB"
# fi

# # Create the database if it does not exist
# if ! pg_isready -h $PROD_POSTGRES_HOST -p $PROD_POSTGRES_PORT -U $PROD_POSTGRES_USER -d $PROD_POSTGRES_DB; then
#   # Create the database if it doesn't exist
#   echo "$PROD_POSTGRES_DB doesn't exist."
#   psql -h $PROD_POSTGRES_HOST -p $PROD_POSTGRES_PORT -U $PROD_POSTGRES_USER -c "CREATE DATABASE $PROD_POSTGRES_DB"
# fi

# # Create the database if it does not exist
# if ! pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB; then
#   echo "$POSTGRES_DB doesn't exist."
#   # Drop the database if it exists
#   psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $POSTGRES_DB"

#   # Create the database
#   psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB"
# fi


# Check if the PostGIS extension is already installed
# psql -U postgres -c "SELECT extname FROM pg_extension" | grep -q "postgis"

# # If not installed, install the PostGIS extension
# if [ $? -ne 0 ]; then
#   psql -U postgres -c "CREATE EXTENSION postgis;"
# fi

# Always create the "uuid-ossp" extension
# psql -h postgres -U postgres -d postgres -p 5432 -w mysecretpassword -c "CREATE EXTENSION postgis;"
# psql -h postgres -U postgres -d postgres -p 5432 -w mysecretpassword -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

# psql -h postgres -U postgres -d postgres -p 5432 -w mysecretpassword -c "SELECT * FROM pg_extension;"

# set -e

# # Perform all actions as $POSTGRES_USER
# export PGUSER="$POSTGRES_USER"

# # Create the 'template_uuid' template db
# "${psql[@]}" <<- 'EOSQL'
# CREATE DATABASE postgres IS_TEMPLATE true IF NOT EXISTS;
# EOSQL

# # Load uuid-ossp into both template_database and $POSTGRES_DB
# for DB in postgres "$POSTGRES_DB"; do
# 	echo "Loading uuid-ossp extension into $DB"
# 	"${psql[@]}" --dbname="$DB" <<-'EOSQL'
# 		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
# EOSQL
# done

# #!/bin/bash
# set -e

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
#    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
# EOSQL


# #!/bin/bash

# set -e

# # Perform all actions as $POSTGRES_USER
# export PGUSER="$POSTGRES_USER"

# # Create the 'template_postgis' template db
# "${psql[@]}" <<- 'EOSQL'
# CREATE DATABASE template_postgis IS_TEMPLATE true;
# EOSQL

# # Load PostGIS into both template_database and $POSTGRES_DB
# for DB in template_postgis "$POSTGRES_DB"; do
# 	echo "Loading PostGIS extensions into $DB"
# 	"${psql[@]}" --dbname="$DB" <<-'EOSQL'
# 		CREATE EXTENSION IF NOT EXISTS postgis;
#         CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
# 		CREATE EXTENSION IF NOT EXISTS postgis_topology;
# 		-- Reconnect to update pg_setting.resetval
# 		-- See https://github.com/postgis/docker-postgis/issues/288
# 		\c
# 		CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
# 		CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
# EOSQL
# done


