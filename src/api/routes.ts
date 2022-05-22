import { Application, Router } from 'express';

import { Controller } from './Controller/Controller';


const _routes: [string, Router][] = [
  ['/', Controller]
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};