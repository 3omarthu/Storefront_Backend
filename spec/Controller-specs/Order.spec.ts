import supertest from 'supertest';
import { storeOrders } from '../../src/api/Model/Orders';
import { serverApi } from '../../src/server';

const req = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test Order controller response,', () => {
  beforeAll(() => {
    spyOn(storeOrders.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 1,
        quantity: 2,
        user_id: 1,
        status: 'complete',
      }))
    spyOn(storeOrders.prototype, 'Show').and.returnValue(
      Promise.resolve([{
        id: 1,
        product_id: 1,
        quantity: 2,
        user_id: 1,
        status: 'complete',
      }]))
      spyOn(storeOrders.prototype, 'delete').and.returnValue(
        Promise.resolve({
          id: 1,
          product_id: 1,
          quantity: 2,
          user_id: 1,
          status: 'complete',
        }))
  });
  it('create order', async (done) => {
    const res = await req.post('/order')
    .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: 'complete'
    });
    done();
  });
  it('shows user order by user id', async (done) => {
    const res = await req.get('/order/1')
    .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: 1,
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: 'complete',
    });
    done();
  });
  it('delete order', async (done) => {
    const res = await req.get('/order/delete')
    .set('Authorization', 'Bearer ' + token).set('id', '1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      id: 1,
      product_id: 1,
      quantity: 2,
      user_id: 1,
      status: 'complete',
    }]);
    done();
  });
});