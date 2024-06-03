# Backend System

This is the backend system for user and business management.

## Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Rename the `.env.example` file to `.env` and update the environment variables with the appropriate values.
4. Set up the PostgreSQL database and update the database configuration in `.env` accordingly.
5. Run the database migrations using `npx sequelize-cli db:migrate`.
6. Start the server in development mode using `npm run dev`.

## Scripts

- `npm start`: Starts the server in production mode.
- `npm run dev`: Starts the server in development mode using Nodemon for automatic restart on file changes.
- `npm test`: Runs the tests using Jest.
- `npm run build`: Compiles the TypeScript code to JavaScript in the `dist` directory.

## API Documentation

The API documentation can be found in the Swagger documentation at `http://localhost:3000/api-docs` when the server is running.

## Common Errors

```
== 20230613145501-create_business_table: migrating =======
ERROR: type "geometry" does not exist
```

Solution:

```
CREATE EXTENSION postgis;
```

1. Open pgAdmin
2. Select (click) your database
3. Click "SQL" icon on the bar
4. Run "CREATE EXTENSION postgis;"

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

helloabdul/docker-compose.dev.yml:

```
version: '3.8'
services:
  website:
    build:
      context: ./website
      dockerfile: Dockerfile.dev
    container_name: website
    volumes:
      - ./website:/app
    ports:
      - '3000:3000'
    depends_on:
      - backend

  crm:
    build:
      context: ./crm
      dockerfile: Dockerfile.dev
    container_name: crm
    volumes:
      - ./crm:/app
    ports:
      - '5173:5173'
    depends_on:
      - backend

  backend:
    image: backend
    restart: always
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: backend
    ports:
      - '50003:50003'
    environment:
      - POSTGRES_HOST=postgres # Use the service name of the PostgreSQL container
      - POSTGRES_USERNAME=postgres
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=
    depends_on:
      - postgres

  postgres:
    image: postgres
    restart: always
    container_name: postgres
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
    volumes:
      - /Users/abdulrehman/Library/Application Support/Postgres/var-15:/var/lib/postgresql/data
```

helloabdul/backend/docker-compose.yml:

```
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: backend
    ports:
      - '50003:50003'
    depends_on:
      - postgres

  postgres:
    image: postgres
    restart: always
    container_name: postgres
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

helloabdul/backend/src/config/database.ts:

```
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log(`Database: ${process.env.POSTGRES_DB} ${process.env.POSTGRES_USER} ${process.env.POSTGRES_PASSWORD} ${process.env.POSTGRES_HOST}`);

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  dialect: 'postgres',
});

export default sequelize;
```

helloabdul/backend/.env:

```
# Environment Variables

# Database Configuration
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=


# JWT Configuration
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=3600

# Gmail Authentication
GMAIL_CLIENT_ID=myclientid
GMAIL_CLIENT_SECRET=myclientsecret
GMAIL_CALLBACK_URL=http://localhost:3000/auth/gmail/callback

# Server Configuration
PORT=50003
```
