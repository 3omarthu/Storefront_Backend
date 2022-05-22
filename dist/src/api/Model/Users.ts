//npm i pg-pool pgimport bcrypt from 'bcrypt'
import Client from '../../database'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';


export type user = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export const generateToken: Function = (id: number): string => {
    return jwt.sign(id.toString(), process.env.Secret as string);
  };

export class userstore {
    async index(): Promise<user[]> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM users'
  
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
      const conn = await Client.connect()
  
      const result = await conn.query(sql, [id])
  
      conn.release()
  
      return result.rows[0]
      } catch (err) {
          throw new Error(`Could not find user ${id}. Error: ${err}`)
      }
    }
  
    async create(b: user): Promise<string> {
        try {
      const saltRounds: string = process.env.SALT_ROUNDS as string;
      const pepper: string = process.env.BCRYPT_PASSWORD as string;

      // @ts-ignore
      const hash = bcrypt.hashSync(
        b.password + pepper, 
        parseInt(saltRounds)
      );
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'

      const conn = await Client.connect()
  
      const result = await conn.query(sql, [b.firstName, b.lastName, hash])
      const user = result.rows[0]
      conn.release()
      const user_id: number = result.rows[0].id;
      const token: string = generateToken(user_id);
      return token;
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }

  
  }