# 🛠 Users-Service

Тестовое задание для Effective Mobile.  
Простой сервис работы с пользователями, реализованный на **Express + TypeScript + MongoDB (Mongoose)**.

---

## 🚀 Функциональность

✅ Регистрация пользователя  
✅ Авторизация по **JWT** (токен передаётся в `Authorization: Bearer <token>`)  
✅ Получение пользователя по ID (**сам себя** или **админ может любого**)  
✅ Получение списка пользователей (**только админ**)  
✅ Блокировка пользователя (**сам себя** или **админ может любого**)

Реализованы лучшие практики:
- **Чистая структура проекта (Controller → Service → Repository)**
- **Валидация входных данных (`express-validator`)**
- **Глобальный обработчик ошибок (`ApiError`)**
- **Ролевая модель (RBAC)**
- **Хеширование паролей (`bcrypt`)**
- **JWT-аутентификация**

---

## 🏗 Стек технологий

- [Express](https://expressjs.com/) – HTTP-сервер
- [TypeScript](https://www.typescriptlang.org/) – типизация
- [MongoDB + Mongoose](https://mongoosejs.com/) – база данных
- [JWT](https://jwt.io/) – авторизация
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) – хеширование паролей
- [express-validator](https://express-validator.github.io/) – валидация входных данных
- [pnpm](https://pnpm.io/) – пакетный менеджер

---

## ▶ Как запустить

```bash
pnpm install
pnpm dev
