import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { AuthRequest } from "../../middlewares/auth.middleware";
import { RegisterDto, LoginDto } from "./user.model";
import { ApiError } from '../../utils/api-error';

class UserController {
    async register(req: Request<{}, {}, RegisterDto>, res: Response, next: NextFunction) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);
            const token = await userService.generateToken(user);
            res.json({ token });
        } catch (err) {
            next(err);
        }
    }

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.findById(id);
            if (!user) throw ApiError.notFound('User not found');

            // Только админ или сам себе
            if (req.user?.role !== 'admin' && req.user?.userId !== id) {
                throw ApiError.forbidden('Access denied');
            }

            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (req.user?.role !== 'admin') throw ApiError.forbidden('Admins only');

            const users = await userService.findAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    async blockUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            if (req.user?.role !== 'admin' && req.user?.userId !== id) {
                throw ApiError.forbidden('Access denied');
            }

            const user = await userService.blockUser(id);
            if (!user) throw ApiError.notFound('User not found');

            res.json({ message: 'User blocked', user });
        } catch (err) {
            next(err);
        }
    }
}

export const userController = new UserController();
