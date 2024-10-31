import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// @ts-ignore
import dbConfig from '../../sequelize/config/config.js';

const conf = dbConfig.development;

dotenv.config();

console.log(`Database: ${conf.database ?? ''} ${conf.username ?? ''} ${conf.password ?? ''} ${conf.host ?? ''}`);

const sequelize = new Sequelize({
  database: conf.database,
  username: conf.username,
  password: conf.password,
  host: conf.host,
  port: parseInt(conf.port ?? '5432'),
  dialect: 'postgres',

  // other configuration options
  logging: false, // disable logging
});

export default sequelize;
