import express from 'express';
import userRoutes from "./moduls/users/user.routes";
import {errorHandler} from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

// тестовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'Users Service API running 🚀' });
});
app.use(userRoutes);

//глобальный обработчик ошибок
app.use(errorHandler);

export default app;
