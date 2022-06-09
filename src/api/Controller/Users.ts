import { Router, Response, Request } from 'express';
import { userstore } from '../Model/Users';
import jwt from 'jsonwebtoken';

export const UserController: Router = Router();
const user = new userstore();
  

UserController.post('/create', async (_req: Request, res: Response) => {
  try{

    
    const addUser = await user.create(_req.body);
    return res.json(addUser);
  }
  catch{
    res.status(402);
    res.json("Something went wrong");
    return;
  }
  });

  UserController.get('/list', async (_req: Request, res: Response) => {
    //return res.json(process.env.Secret as string);
    try {
      const authHead: string | undefined = _req.headers.authorization;
      const token: string = authHead ? authHead.split(' ')[1] : '';
      jwt.verify(token, process.env.Secret as string);
    } catch {
      res.status(402);
      res.json("invalid access");
      return;
    }
    try{
      const storeUsers = await user.index();
      return res.json(storeUsers);
    }
    catch{
      res.status(402);
      res.json("Something went wrong");
      return;
    }
});

UserController.get('/:id', async (_req: Request, res: Response) => {
  try {
    const authHead: string | undefined = _req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    jwt.verify(token, process.env.Secret as string);
  } catch {
    res.status(402);
    res.json("invalid access");
    return;
  }
  try{
    const id: string = _req.params.id;
    const storeUser = await user.show(id);
    return res.json(storeUser);
  }
  catch{
    res.status(402);
    res.json("Something went wrong");
    return;
  }
});

UserController.delete('/delete', async (_req: Request, res: Response) => {
  try {
    const authHead: string | undefined = _req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    jwt.verify(token, process.env.Secret as string);
  } catch {
    res.status(402);
    res.json("invalid access");
    return;
  }
  try{
    
  const id: string = _req.body.id;
  const storeUser = await user.delete(id);
  return res.json(storeUser);
  }
  catch{
    res.status(402);
    res.json("Something went wrong");
    return;
  }
});