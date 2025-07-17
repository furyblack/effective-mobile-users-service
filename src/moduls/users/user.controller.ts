import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { AuthRequest } from "../../middlewares/auth.middleware";
import { RegisterDto, LoginDto } from "./user.model";
import { ApiError } from '../../utils/api-error';
import {UserOutputDto} from "../types/user.output.dto";

class UserController {
    async register(req: Request<{}, {}, RegisterDto>, res: Response, next: NextFunction) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(UserOutputDto.mapToOutput(user));
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

            res.json(UserOutputDto.mapToOutput(user));
        } catch (err) {
            next(err);
        }
    }

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const users = await userService.findAll();

            const usersOutput = users.map(UserOutputDto.mapToOutput)
            res.json(usersOutput);
        } catch (err) {
            next(err);
        }
    }

    async blockUser(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = await userService.blockUser(id);
            if (!user) throw ApiError.notFound('User not found');


            res.json({ message: 'User blocked', user: UserOutputDto.mapToOutput(user) });
        } catch (err) {
            next(err);
        }
    }
}

export const userController = new UserController();
