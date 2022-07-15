import { addOrder, storeOrders } from '../../src/api/Model/Orders';

import { userstore } from '../../src/api/Model/Users';
import { storeProducts } from '../../src/api/Model/Products';

const order: storeOrders = new storeOrders();

describe('order model', () => {
  it('shows user order by user id', () => {
    expect(order.Show).toBeDefined();
  });
  describe('Manipulate Order methods', () => {
    const user = new userstore();
    const product = new storeProducts();  
  beforeAll(async () => {
      await user.create({
        firstname: 'omar',
        lastname: 'thu',
        password: 'pass123123@'
      });
      await product.create({
        name: 'iPhone',
        price: 150,
      });
      await order.create({
        product_id: 1,
        quantity: 2,
        user_id: 1,
        status: "active",
      });
    });
    it('should create order using createOrder method', async () => {
      const result = await order.create({
        product_id: 2,
        quantity: 2,
        user_id: 2,
        status: 'active'
      });
      expect(result).toEqual({
        id: 2,
        product_id: 2,
        quantity: 2,
        user_id: 2,
        status: 'active'
      });
    });
    it('shows user order by user id', async () => {
      const res = await order.Show("2");
      expect(res[0]).toEqual({
        id:1,
        product_id: 1,
        quantity: 2,
        user_id: 2,
        status: "active",
      });
    });
    it('delete order', async () => {
      const res = await order.delete("1");
      expect(res).toEqual({
        id:1,
        product_id: 1,
        quantity: 2,
        user_id: 1,
        status: "active",
      });

    });
  });
}); 