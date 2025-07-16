import {Request, Response, NextFunction} from "express";


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    console.error('❌ Error:', err.message);

    const status = err.statusCode ?? 500;

    res.status(status).json({message:err.message || 'внутренняя ошибка сервера'})
}