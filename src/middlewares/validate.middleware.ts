import { Request, Response, NextFunction } from 'express';
import {validationResult} from "express-validator";


export function validateRequest(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: 'Validation error',
            errors: errors.array(),
        })
    }
    next();
}