export type order = {    
    id: number;
    product_id: number;
    quantity: number;
    user_id: number;
    status: string; //(active or complete)
}


export class storeOrders {
    async Show(user_id: number): Promise<order> {
      try {
        // @ts-ignore
        const conn = await Client.connect()
        const sql = 'SELECT * FROM orders WHERE user_id = ($1)'
  
        const result = await conn.query(sql, [user_id])
  
        conn.release()
  
        return result.rows[0]
      } catch (err) {
        throw new Error(`Could not get orders. Error: ${err}`)
      }
    }
}