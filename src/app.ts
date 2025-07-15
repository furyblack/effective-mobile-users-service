import express from 'express';

const app = express();

app.use(express.json());

// тестовый маршрут
app.get('/', (req, res) => {
    res.json({ message: 'Users Service API running 🚀' });
});

export default app;
