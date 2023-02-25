import * as mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
