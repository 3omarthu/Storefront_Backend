import { Router, Response, Request } from 'express';

import { storeOrders } from '../Model/Orders';

import { token } from '../Middleware/Authintication';

export const OrderController: Router = Router();
const order = new storeOrders();



OrderController.get(
  '/:user_id',
  token,
  async (req: Request, res: Response) => {
    const user_id: number = parseInt(req.params.user_id);
    const currentOrder = await order.Show(user_id);
    return res.json(currentOrder);
  }
);