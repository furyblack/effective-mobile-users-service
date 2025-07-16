import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export interface AuthRequest  extends  Request{
    user?:{userId:string, role:string};
}

export function authMiddleware(req: AuthRequest, res:Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"требуется авторизация"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {userId:string, role:string};
        req.user = decoded; // теперь в реквесте будет {userId, role}
        next();
    }catch(err){
        return res.status(401).json({message:'невалидный или протухший токен'})
    }
}