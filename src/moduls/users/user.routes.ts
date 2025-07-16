import { Router } from 'express';
import userController from './user.controller';

const router = Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

export default router;
