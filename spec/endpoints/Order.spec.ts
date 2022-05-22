import supertest from 'supertest';
import { storeOrders } from '../../src/api/Model/Orders';
import { serverApi } from '../../src/server';

const request = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test Show Order endpoint response', () => {
  beforeAll(() => {

    spyOn(storeOrders.prototype, 'Show').and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 5,
        quantity: 2,
        user_id: 1,
        status: 'complete',
      }))
  });

  it('shows user order by user id', async (done) => {
    const res = await request.get('/order/1')
      .set('Authorization', 'Bearer ' + token);

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