import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

jwt.sign;

export const token = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization;
        const token: string = authorizationHeader ?authorizationHeader.split(' ')[1]: '';
        const decoded: string | object = jwt.verify(token,process.env.Secret as string);
        res.locals.userData = decoded;
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}