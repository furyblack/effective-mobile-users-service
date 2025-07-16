import { Router } from 'express';
import userController from './user.controller';
import {authMiddleware} from "../../middlewares/auth.middleware";

const router = Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.get('/users/:id', authMiddleware, userController.getById);
router.get('/users', authMiddleware, userController.getAll)
router.patch('/users/:id/block', authMiddleware, userController.blockUser)


export default router;
