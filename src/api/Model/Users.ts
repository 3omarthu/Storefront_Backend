//npm i pg-pool pgimport bcrypt from 'bcrypt'
import {client} from '../../database'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';

const saltRounds: string = process.env.SALT_ROUNDS as string;
const pepper: string = process.env.BCRYPT_PASSWORD as string;

export type addUser = {
    firstname: string;
    lastname: string;
    password: string;
}

export type user = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
}

export class userstore {
    async index(): Promise<user[]> {
      try {
        const sql = 'SELECT * FROM users'
        // @ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql)
  
        conn.release()
        return result.rows 
      } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`)
      }
    }
  
    async show(id: string): Promise<user> {
      try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
  
      return result.rows[0]
      } catch (err) {
          throw new Error(`Could not find user ${id}. Error: ${err}`)
      }
    }
  
    async create(u: addUser): Promise<string> {
      try {
      const conn = await client.connect()
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES( $1, $2, $3) RETURNING *'
      // @ts-ignore
      const hash = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [u.firstname, u.lastname, hash])
      const user = result.rows[0]
      conn.release()
      const token: string = jwt.sign(user, process.env.Secret as string);
      return token;
      } catch (err) {
          throw new Error(`unable to create user, ${err}`)
      }
    }

    async delete(id: string): Promise<string> {
      try {
        
        const sql = 'DELETE FROM users WHERE id=$1'
        // @ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

  
  }