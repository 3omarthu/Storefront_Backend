import supertest from 'supertest';
import { storeOrders } from '../../src/api/Model/Orders';
import { storeProducts } from '../../src/api/Model/Products';
import { userstore } from '../../src/api/Model/Users';
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
    spyOn(storeProducts.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: "string",
          price: 100,
        }
      ]))
    spyOn(storeProducts.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        name: "string",
        price: 100,
      }))
    spyOn(storeProducts.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        name: "string",
        price: 100,
      }))

    spyOn(userstore.prototype, 'create').and.returnValue(
      Promise.resolve(
         "eyJhbGciOiJIqzI1NiIsInRfcCI6IkpXVCJ9.330.J8BgsyqA3Y6F71NXbfuYyfRVuvRa_qb08RStxrCVhlQ"
      )
      )

    spyOn(userstore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: "string",
        lastName: "string",
        password: "string",
      }))

    spyOn(userstore.prototype, 'index').and.returnValue(
      Promise.resolve([{
        id: 1,
        firstName: "string",
        lastName: "string",
        password: "string",
      }]))
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

  it('return all products', async (done) => {
    const res = await request.get('/product');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      id: 1,
      name: "string",
      price: 100,
    }]);
    done();
  });

  it('create product', async (done) => {
    const res = await request.post('/product')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "string",
      price: 100,
    });
    done();
  });

  it('shows products by id', async (done) => {
    const res = await request.get('/product/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "string",
      price: 100,
    });
    done();
  });

  it('return all users', async (done) => {
    const res = await request.get('/user')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      firstName: "string",
      lastName: "string",
      password: "string",
    });
    done();
  });

  it('create user', async (done) => {
    const res = await request.post('/user')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    done();
  });

  it('shows user by id', async (done) => {
    const res = await request.get('/user/1')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
        firstName: "string",
        lastName: "string",
        password: "string",
    });
    done();
  });
});