import { Application, Router } from 'express';

import { OrderController } from './Controller/Orders';
import { ProductController } from './Controller/Products';
import { UserController } from './Controller/Users';


const _routes: [string, Router][] = [
  ['/order', OrderController],
  ['/product', ProductController],
  ['/user', UserController]
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};