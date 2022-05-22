import { Router, Response, Request } from 'express';

import { storeOrders } from '../Model/Orders';
import { storeProducts } from '../Model/Products';
import { userstore } from '../Model/Users';

import { token } from '../Middleware/Authintication';

export const Controller: Router = Router();
const order = new storeOrders();
const product = new storeProducts();
const user = new userstore();



Controller.get(
  '/order/:user_id',
  token,
  async (req: Request, res: Response) => {
    const user_id: number = parseInt(req.params.user_id);
    const currentOrder = await order.Show(user_id);
    return res.json(currentOrder);
  }
);

Controller.post('/product', token, async (req: Request, res: Response) => {
    const createdProduct = await product.create(req.body);
    return res.json(createdProduct);
});
Controller.get('/product', async (_: Request, res: Response) => {
    const allProducts = await product.index();
    return res.json(allProducts);
});
  
Controller.get('/product/:id', async (req: Request, res: Response) => {
    const product_Id:string =req.params.id;
    const productById = await product.show(product_Id);
    return res.json(productById);
});
  

Controller.post('/user', token, async (req: Request, res: Response) => {
    const addedUser = await user.create(req.body);
    return res.json(addedUser);
  });

Controller.get('/user', token, async (_: Request, res: Response) => {
  const storeUsers = await user.index();
  return res.json(storeUsers);
});

Controller.get('/user/:id', token, async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const storeUser = await user.show(id);
  return res.json(storeUser);
});