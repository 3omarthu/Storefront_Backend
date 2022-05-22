import supertest from 'supertest';
import { userstore } from '../../src/api/Model/Users';
import { serverApi } from '../../src/server';

const request = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test Show Order endpoint response', () => {
  beforeAll(() => {

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