import { Router, Response, Request } from 'express';
import { userstore } from '../Model/Users';
import { token } from '../Middleware/Authintication';

export const UserController: Router = Router();
const user = new userstore();
  

UserController.post('/', async (req: Request, res: Response) => {
    const addedUser = await user.create(req.body);
    return res.json(addedUser);
  });

  UserController.get('/', token, async (_: Request, res: Response) => {
  const storeUsers = await user.index();
  return res.json(storeUsers);
});

UserController.get('/:id', token, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const storeUser = await user.show(id);
  return res.json(storeUser);
});