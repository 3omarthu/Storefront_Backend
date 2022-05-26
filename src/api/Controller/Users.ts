import { Router, Response, Request } from 'express';
import { userstore } from '../Model/Users';
import jwt from 'jsonwebtoken';

export const UserController: Router = Router();
const user = new userstore();
  

UserController.post('/create', async (_req: Request, res: Response) => {
    const addUser = await user.create(_req.body);
    return res.json(addUser);
  });

  UserController.get('/list', async (_req: Request, res: Response) => {
    //return res.json(process.env.Secret as string);
    try{
       jwt.verify(_req.body.token, process.env.Secret as string);
    }catch{
      res.status(401);
      res.json("invalid access");
      return;
    }
  const storeUsers = await user.index();
  return res.json(storeUsers);
});

UserController.get('/:id', async (_req: Request, res: Response) => {
  //return res.json(_req.body.token);
  try{
    jwt.verify(_req.body.token, process.env.Secret as string);
  }catch{
    res.status(401);
    res.json("invalid access");
    return;
  }
  const id: string = _req.params.id;
  const storeUser = await user.show(id);
  return res.json(storeUser);
});

UserController.delete('/delete', async (_req: Request, res: Response) => {
  //return _req;
  try{
    const decoded: string | object = jwt.verify(_req.body.token, process.env.Secret as string);
  }catch{
    res.status(401);
    res.json("invalid access");
    return;
  }
  const id: string = _req.body.id;
  const storeUser = await user.delete(id);
  return res.json(storeUser);
});