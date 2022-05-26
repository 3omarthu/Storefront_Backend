import supertest from 'supertest';
import { storeOrders } from '../../src/api/Model/Orders';
import { serverApi } from '../../src/server';

const request = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test Order controller response,', () => {
  beforeAll(() => {
    spyOn(storeOrders.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 5,
        quantity: 2,
        user_id: 1,
        status: 'complete',
      }))
    spyOn(storeOrders.prototype, 'Show').and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 5,
        quantity: 2,
        user_id: 1,
        status: 'complete',
      }))
      spyOn(storeOrders.prototype, 'delete').and.returnValue(
        Promise.resolve({
          id: 1,
          product_id: 5,
          quantity: 2,
          user_id: 1,
          status: 'complete',
        }))
  });
  it('create order', async (done) => {
    const res = await request.post('/order')
    .set('token', token);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: 1,
      product_id: 5,
      quantity: 2,
      user_id: 1,
      status: 'complete',
    });
    done();
  });
  it('shows user order by user id', async (done) => {
    const res = await request.get('/order/1')
    .set('token', token);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: 1,
      product_id: 5,
      quantity: 2,
      user_id: 1,
      status: 'complete',
    });
    done();
  });
  it('delete order', async (done) => {
    const res = await request.get('/order/delete')
    .set('token', token).set('id', '1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      product_id: 5,
      quantity: 2,
      user_id: 1,
      status: 'complete',
    });
    done();
  });
});