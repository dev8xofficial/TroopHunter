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

  // other configuration options
  // logging: false, // disable logging
});

export default sequelize;
