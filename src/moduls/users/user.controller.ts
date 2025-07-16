import { Request, Response, NextFunction } from 'express';
import userService from './user.service';

class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err); // передадим ошибку в глобальный обработчик
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const token = await userService.login(email, password);
            res.json(token);
        }catch(err) {
            next(err);
        }
    }
}

export default new UserController();

