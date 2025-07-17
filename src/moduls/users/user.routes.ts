import { Router } from 'express';
import {authMiddleware, requireAdmin, requireOwnerOrAdmin} from "../../middlewares/auth.middleware";
import { loginValidation, registerValidation, userIdValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validate.middleware";
import { userController } from "./user.controller";

const router = Router();

router.post(
    '/auth/register',
    registerValidation,
    validateRequest,
    userController.register.bind(userController)
);

router.post(
    '/auth/login',
    loginValidation,
    validateRequest,
    userController.login.bind(userController)
);

router.get(
    '/users/:id',
    authMiddleware,
    userIdValidation,
    validateRequest,
    requireOwnerOrAdmin,
    userController.getById.bind(userController)
);

router.get(
    '/users',
    authMiddleware,
    requireAdmin,
    userController.getAll.bind(userController)
);

router.patch(
    '/users/:id/block',
    authMiddleware,
    userIdValidation,
    validateRequest,
    requireOwnerOrAdmin,
    userController.blockUser.bind(userController)
);

export default router;
