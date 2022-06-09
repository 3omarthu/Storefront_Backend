import { Router, Response, Request } from 'express';
import { storeOrders } from '../Model/Orders';
import jwt from 'jsonwebtoken';
import { Token } from '../Middleware/Authintication';


export const OrderController: Router = Router();
const order = new storeOrders();


OrderController.get('/:user_id', async (_req: Request, res: Response) => {
  try {
    const authHead: string | undefined = _req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    jwt.verify(token, process.env.Secret as string);
  } catch {
    res.status(402);
    res.json("invalid access");
    return;
  }
  try {

    const user_id = (_req.params.user_id);
    const currentOrder = await order.Show(user_id);
    return res.json(currentOrder);
  }
  catch {
    res.status(402);
    res.json("Something went wrong");
    return;
  }
}
);

OrderController.post('/', async (_req: Request, res: Response) => {
  try {
    const authHead: string | undefined = _req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    jwt.verify(token, process.env.Secret as string);
  } catch {
    res.status(402);
    res.json("invalid access");
    return;
  }
  try {
    const createdOrder = await order.create(_req.body);
    return res.json(createdOrder);
  }
  catch {
    res.status(402);
    res.json("Something went wrong");
    return;
  }
}
);

OrderController.delete('/delete', async (_req: Request, res: Response) => {
  try {
    const authHead: string | undefined = _req.headers.authorization;
    const token: string = authHead ? authHead.split(' ')[1] : '';
    jwt.verify(token, process.env.Secret as string);
  } catch {
    res.status(402);
    res.json("invalid access");
    return;
  }
  try {

    const id = (_req.body.id);
    const deletedOrder = await order.delete(id);
    return res.json(deletedOrder);
  }
  catch {
    res.status(402);
    res.json("Something went wrong");
    return;
  }
}
);