import { Router } from 'express';
import userController from './user.controller';
import {authMiddleware} from "../../middlewares/auth.middleware";
import {loginValidation, registerValidation, userIdValidation} from "./user.validation";
import {validateRequest} from "../../middlewares/validate.middleware";

const router = Router();

router.post('/auth/register', registerValidation, validateRequest, userController.register);
router.post('/auth/login', loginValidation, validateRequest, userController.login);
router.get('/users/:id', authMiddleware, userIdValidation, validateRequest, userController.getById);
router.get('/users', authMiddleware, userController.getAll)
router.patch('/users/:id/block', authMiddleware,  userIdValidation, validateRequest, userController.blockUser)


export default router;
