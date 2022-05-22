
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const client = new Pool({
  user: process.env. POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB
});
export default client