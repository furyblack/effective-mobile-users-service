import {body, param} from "express-validator";

export const registerValidation = [
    body('fullName')
        .isString().withMessage('Имя должно быть строкой')
    .isLength({ min: 3, }).withMessage('Имя должно быть минимум 3 символа'),

    body('birthDate')
        .isISO8601().withMessage('Дата рождения должна быть в формате YYYY-MM-DD'),

    body('email')
    .isEmail().withMessage('Некорректный email'),

    body('password')
        .isLength({ min: 6}).withMessage('Пароль должен быть минимум 6 символов'),
]

export const loginValidation = [
    body('email').isEmail().withMessage('Некорректный email'),
    body('password').notEmpty().withMessage('Пароль обязателен')
]

export const userIdValidation = [
    param('id').isMongoId().withMessage('Некорректный id пользователя')
]