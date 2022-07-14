import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env

   export const client: Pool  =  new Pool({
    host: POSTGRES_HOST,
    database: process.env.ENV === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
// export default client