import supertest from 'supertest';
import { storeProducts } from '../../src/api/Model/Products';
import { serverApi } from '../../src/server';

const request = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test Product controller response,', () => {
  beforeAll(() => {
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
      spyOn(storeProducts.prototype, 'delete').and.returnValue(
        Promise.resolve({
          id: 1,
          name: "string",
          price: 100,
        }))
  });

  it('return all products', async (done) => {
    const res = await request.get('/product');

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual([{
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

  it('shows product by id', async (done) => {
    const res = await request.get('/product/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "string",
      price: 100,
    });
    done();
  });

  it('delete product', async (done) => {
    const res = await request.delete('/product/delete')
    .set('Authorization', 'Bearer ' + token).set('id', '1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "string",
      price: 100,
    });
    done();
  });
});