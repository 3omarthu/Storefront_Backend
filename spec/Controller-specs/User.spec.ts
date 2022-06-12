import supertest from 'supertest';
import { userstore } from '../../src/api/Model/Users';
import { serverApi } from '../../src/server';

const request = supertest(serverApi);
const token: string = process.env.Token as string;

describe('Test User controller response,', () => {
  beforeAll(() => {

    spyOn(userstore.prototype, 'create').and.returnValue(
      Promise.resolve(
         token
      )
      )

    spyOn(userstore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        firstname: "omar",
        lastname: "thu",
        password: "string",
      }))

    spyOn(userstore.prototype, 'index').and.returnValue(
      Promise.resolve([{
        id: 1,
        firstname: "omar",
        lastname: "thu",
        password: "string",
      }]))
  });

  it('return all users', async (done) => {
    const res = await request.get('/user/list')
      .set('Authorization', 'Bearer ' + token);

    expect(res.status).toBe(200);
    expect(res.body[0].firstname).toEqual("omar");
    expect(res.body[0].lastname).toEqual("thu");

    done();
  });

  it('create user', async (done) => {
    const res = await request.post('/user/create');

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
        firstname: "omar",
        lastname: "thu",
        password: "string",
    });
    done();
  });
});