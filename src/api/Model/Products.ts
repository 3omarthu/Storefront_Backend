import {client} from '../../database'

export type addProduct = {
  name: string;
  price: number;
}

export type product = {
    id: number;
    name: string;
    price: number;
}


export class storeProducts {

    async index(): Promise<product[]> {
      try {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM products'
  
        const result = await conn.query(sql)
  
        conn.release()
  
        return result.rows 
      } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`)
      }
    }

    async show(id: string): Promise<product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(b: addProduct): Promise<product> {
        try {
      // @ts-ignor
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'

      const conn = await client.connect()
  
      const result = await conn.query(sql, [b.name, b.price])
      const product = result.rows[0]
      conn.release()
      return product;
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<product> {
      try {
        
        const sql = 'DELETE FROM products WHERE id=$1'
        // @ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }
}