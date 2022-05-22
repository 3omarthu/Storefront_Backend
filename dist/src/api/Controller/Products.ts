import { Router, Response, Request } from 'express';
import { storeProducts } from '../Model/Products';
import { token } from '../Middleware/Authintication';

export const ProductController: Router = Router();
const product = new storeProducts();

ProductController.post('/', token, async (req: Request, res: Response) => {
    const createdProduct = await product.create(req.body);
    return res.json(createdProduct);
});
ProductController.get('/', async (_: Request, res: Response) => {
    const allProducts = await product.index();
    return res.json(allProducts);
});
  
ProductController.get('//:id', async (req: Request, res: Response) => {
    const product_Id:string =req.params.id;
    const productById = await product.show(product_Id);
    return res.json(productById);
});
