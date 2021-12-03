import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

let databaseConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
};

if (NODE_ENV === 'prod') {
  databaseConfig = {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const connection = new Pool(databaseConfig);

export default connection;
