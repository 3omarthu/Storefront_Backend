import { userstore, user } from '../../src/api/Model/Users';

const user: userstore = new userstore();

describe('User Model', () => {
  it('Get all users method must be defined', () => {
    expect(user.index).toBeDefined();
  });

  it('Get user by id method must be defined', () => {
    expect(user.show).toBeDefined();
  });

  it('Create user  method must be defined', () => {
    expect(user.create).toBeDefined();
  });

  it('Create a user', async () => {
    const res = await user.create({
      firstname: 'omar',
      lastname: 'thu',
      password: 'pass1234'
    });
    expect(res).toBeDefined();
  });
  it('Return all users', async () => {
    const res: user[] = await user.index();

    expect(res[0].id).toEqual(1);
    expect(res[0].firstname).toEqual('omar');
    expect(res[0].lastname).toEqual('thu');
    expect(res[0].password).not.toEqual('pass1234');
  });

  it('Return the user by id', async () => {
    const id: string = "1";
    const res: user = await user.show(id);
    console.log(res);
    expect(res.id).toEqual(1);
    expect(res.firstname).toEqual('omar');
    expect(res.lastname).toEqual('thu');
  });
});