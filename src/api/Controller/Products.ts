import { Router, Response, Request } from 'express';
import { storeProducts } from '../Model/Products';
import jwt from 'jsonwebtoken';

export const ProductController: Router = Router();
const product = new storeProducts();

ProductController.post('/create', async (_req: Request, res: Response) => {
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

        const createdProduct = await product.create(_req.body);
        return res.json(createdProduct);
      }
      catch{
        res.status(402);
        res.json("Something went wrong");
        return;
      }
});
ProductController.get('/list', async (_req: Request, res: Response) => {
  try{

    const allProducts = await product.index();
    return res.json(allProducts);
  }
  catch{
    res.status(402);
    res.json("Something went wrong");
    return;
  }
});
  
ProductController.get('/:id', async (_req: Request, res: Response) => {
  try{

    const product_Id:string =_req.params.id;
    const productById = await product.show(product_Id);
    return res.json(productById);
  }
  catch{
    res.status(402);
    res.json("Something went wrong");
    return;
  }
});

ProductController.delete('/delete', async (_req: Request, res: Response) => {
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

        const id:string =_req.body.id;
        const productById = await product.delete(id);
        return res.json(productById);
      }
      catch{
        res.status(402);
        res.json("Something went wrong");
        return;
      }
});