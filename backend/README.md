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
      - '50001:50001'
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
      - '50001:50001'
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

console.log(`Database: ${process.env.DB_NAME} ${process.env.DB_USERNAME} ${process.env.DB_PASSWORD} ${process.env.DB_HOST}`);

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
});

export default sequelize;
```

helloabdul/backend/.env:

```
DATABASE_URL=postgres://postgres:@localhost:5432/postgres

# Environment Variables

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_NAME=postgres
DB_USERNAME=postgres
DB_PASSWORD=


# JWT Configuration
JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=3600

# Gmail Authentication
GMAIL_CLIENT_ID=myclientid
GMAIL_CLIENT_SECRET=myclientsecret
GMAIL_CALLBACK_URL=http://localhost:3000/auth/gmail/callback

# Server Configuration
PORT=50001
```

Resolve this Error:

```
2023-06-01 11:15:54 Database: postgres postgres  postgres
2023-06-01 11:15:54 Database: postgres postgres  postgres
2023-06-01 11:15:54 Server running on port 50001
2023-06-01 11:15:54 /app/node_modules/sequelize/src/dialects/postgres/connection-manager.js:179
2023-06-01 11:15:54                 reject(new sequelizeErrors.ConnectionRefusedError(err));
2023-06-01 11:15:54                        ^
2023-06-01 11:15:54 ConnectionRefusedError [SequelizeConnectionRefusedError]: connect ECONNREFUSED 172.22.0.2:5432
2023-06-01 11:15:54     at Client._connectionCallback (/app/node_modules/sequelize/src/dialects/postgres/connection-manager.js:179:24)
2023-06-01 11:15:54     at Client._handleErrorWhileConnecting (/app/node_modules/pg/lib/client.js:327:19)
2023-06-01 11:15:54     at Client._handleErrorEvent (/app/node_modules/pg/lib/client.js:337:19)
2023-06-01 11:15:54     at Connection.emit (node:events:513:28)
2023-06-01 11:15:54     at Connection.emit (node:domain:489:12)
2023-06-01 11:15:54     at Socket.reportStreamError (/app/node_modules/pg/lib/connection.js:58:12)
2023-06-01 11:15:54     at Socket.emit (node:events:513:28)
2023-06-01 11:15:54     at Socket.emit (node:domain:489:12)
2023-06-01 11:15:54     at emitErrorNT (node:internal/streams/destroy:151:8)
2023-06-01 11:15:54     at emitErrorCloseNT (node:internal/streams/destroy:116:3) {
2023-06-01 11:15:54   parent: Error: connect ECONNREFUSED 172.22.0.2:5432
2023-06-01 11:15:54       at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1284:16) {
2023-06-01 11:15:54     errno: -111,
2023-06-01 11:15:54     code: 'ECONNREFUSED',
2023-06-01 11:15:54     syscall: 'connect',
2023-06-01 11:15:54     address: '172.22.0.2',
2023-06-01 11:15:54     port: 5432
2023-06-01 11:15:54   },
2023-06-01 11:15:54   original: Error: connect ECONNREFUSED 172.22.0.2:5432
2023-06-01 11:15:54       at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1284:16) {
2023-06-01 11:15:54     errno: -111,
2023-06-01 11:15:54     code: 'ECONNREFUSED',
2023-06-01 11:15:54     syscall: 'connect',
2023-06-01 11:15:54     address: '172.22.0.2',
2023-06-01 11:15:54     port: 5432
2023-06-01 11:15:54   }
2023-06-01 11:15:54 }
2023-06-01 11:15:54 [nodemon] app crashed - waiting for file changes before starting...
```

Additional Information about error:
Failure case:
When I use docker to run the backend project, sequelize failed to connect.

Success case:
I have to change DB_HOST=postgres to DB_HOST=localhost. Then I run the backend project directly by running the command `npm run dev` into backend directory without running docker. Sequelize successfully connected.
