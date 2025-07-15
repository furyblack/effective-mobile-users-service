import { config } from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/users_service';

async function bootstrap() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB connected');

        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (err) {
        console.error('❌ Failed to start server:', err);
    }
}

bootstrap();

