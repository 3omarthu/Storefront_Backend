import {client} from '../../database'

export type order = {    
    id: number;
    product_id: number;
    quantity: number;
    user_id: number;
    status: string; //(active or complete)
}

export type addOrder = {    
  product_id: number;
  quantity: number;
  user_id: number;
  status: string; //(active or complete)
}


export class storeOrders {
    async Show(user_id: string): Promise<order> {
      try {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders WHERE user_id = ($1)'
  
        const result = await conn.query(sql, [user_id])
  
        conn.release()
  
        return result.rows[0]
      } catch (err) {
        throw new Error(`Could not get orders. Error: ${err}`)
      }
    }
    async create(o: addOrder): Promise<order> {
      try {
    // @ts-ignor
    const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'

    const conn = await client.connect()

    const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status])
    const order = result.rows[0]
    conn.release()
    return order;
      } catch (err) {
          throw new Error(`Could not add new order. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=$1'
      // @ts-ignore
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0];
      } catch (err) {
          throw new Error(`Could not find orders ${id}. Error: ${err}`)
      }
  }
}