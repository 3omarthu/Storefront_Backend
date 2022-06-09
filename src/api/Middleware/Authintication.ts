import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const Token = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHead: string | undefined = req.headers.authorization;
        const token: string = authHead ? authHead.split(' ')[1] : '';
    
        const decoded: string | object = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        );
        res.locals.userData = decoded;
        next();
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}