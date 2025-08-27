import path from 'path';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment-specific .env file
const envFile = `.env.${process.env.NODE_ENV ?? 'development'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`Database: ${process.env.POSTGRES_DB ?? ''} ${process.env.POSTGRES_USER ?? ''} ${process.env.POSTGRES_PASSWORD ?? ''} ${process.env.POSTGRES_HOST ?? ''}`);

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  dialect: 'postgres',

  // other configuration options
  logging: false, // disable logging
});

export default sequelize;
