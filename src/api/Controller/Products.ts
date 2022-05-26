import { Router, Response, Request } from 'express';
import { storeProducts } from '../Model/Products';
import jwt from 'jsonwebtoken';

export const ProductController: Router = Router();
const product = new storeProducts();

ProductController.post('/create', async (_req: Request, res: Response) => {
    try{
         jwt.verify(_req.body.token, process.env.Secret as string);
      }catch{
        res.status(401);
        res.json("invalid access");
        return;
      }
    const createdProduct = await product.create(_req.body);
    return res.json(createdProduct);
});
ProductController.get('/list', async (_req: Request, res: Response) => {
    try{
         jwt.verify(_req.body.token, process.env.Secret as string);
      }catch{
        res.status(401);
        res.json("invalid access");
        return;
      }
    const allProducts = await product.index();
    return res.json(allProducts);
});
  
ProductController.get('/:id', async (_req: Request, res: Response) => {
    try{
         jwt.verify(_req.body.token, process.env.Secret as string);
      }catch{
        res.status(401);
        res.json("invalid access");
        return;
      }
    const product_Id:string =_req.params.id;
    const productById = await product.show(product_Id);
    return res.json(productById);
});

ProductController.delete('/delete', async (_req: Request, res: Response) => {
    try{
         jwt.verify(_req.body.token, process.env.Secret as string);
      }catch{
        res.status(401);
        res.json("invalid access");
        return;
      }
    const id:string =_req.body.id;
    const productById = await product.delete(id);
    return res.json(productById);
});