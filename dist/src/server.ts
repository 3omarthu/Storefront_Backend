import express, { Application } from 'express';
import { routes } from './api/routes';

const app: Application = express()
const address: string = "0.0.0.0:3000"

app.use(express.json());

routes(app);

app.use(express.json());
export const serverApi = app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
