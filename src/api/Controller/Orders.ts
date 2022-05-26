import { Router, Response, Request } from 'express';
import { storeOrders } from '../Model/Orders';
import jwt from 'jsonwebtoken';

export const OrderController: Router = Router();
const order = new storeOrders();



OrderController.get('/:user_id', async (_req: Request, res: Response) => {
  try{
     jwt.verify(_req.body.token, process.env.Secret as string);
  }catch{
    res.status(401);
    res.json("invalid access");
    return;
  }
    const user_id = (_req.params.user_id);
    const currentOrder = await order.Show(user_id);
    return res.json(currentOrder);
  }
);

OrderController.post('/', async (_req: Request, res: Response) => {
  try{
     jwt.verify(_req.body.token, process.env.Secret as string);
  }catch{
    res.status(401);
    res.json("invalid access");
    return;
  }
    const createdOrder = await order.create(_req.body);
    return res.json(createdOrder);
  }
);

OrderController.delete('/delete', async (_req: Request, res: Response) => {
  try{
     jwt.verify(_req.body.token, process.env.Secret as string);
  }catch{
    res.status(401);
    res.json("invalid access");
    return;
  }
    const id = (_req.body.id);
    const deletedOrder = await order.delete(id);
    return res.json(deletedOrder);
  }
);