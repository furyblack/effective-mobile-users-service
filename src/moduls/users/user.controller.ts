import { Request, Response, NextFunction } from 'express';
import userService from './user.service';
import {AuthRequest} from "../../middlewares/auth.middleware";

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

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            //проверка прав
            if(req.user?.role !== 'admin' && req.user?.userId !== id) {
                return res.status(403).json({message: 'доступ запрещен'})
            }
            const user = await userService.getById(id);
            res.json(user);
        }catch(err) {
            next(err);
        }
    }

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== 'admin') {
                return res.status(403).json({message:'только админ может посмотреть список пользователей '})
            }
            const users = await userService.getAllUsers()
            res.json(users);
        }catch(err) {
            next(err);
        }
    }

    async blockUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            //можно самому себя или админу
            if(req.user?.role !== 'admin' && req.user?.userId !== id) {
                return res.status(403).json({message:'вы не можете заблокировать пользователя'})
            }
            const user = await userService.blockUser(id);
            res.json({message:'пользователь заблокирован', user});
        }catch(err) {
            next(err);
        }
    }
}

export default new UserController();

