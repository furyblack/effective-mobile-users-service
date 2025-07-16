import express from 'express';
import userRoutes from "./moduls/users/user.routes";

const app = express();

app.use(express.json());

// тестовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'Users Service API running 🚀' });
});
app.use(userRoutes);

export default app;
