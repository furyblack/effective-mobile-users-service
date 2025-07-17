import { Router } from 'express';
import { authMiddleware } from "../../middlewares/auth.middleware";
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
    userController.getById.bind(userController)
);

router.get(
    '/users',
    authMiddleware,
    userController.getAll.bind(userController)
);

router.patch(
    '/users/:id/block',
    authMiddleware,
    userIdValidation,
    validateRequest,
    userController.blockUser.bind(userController)
);

export default router;
