import userRepository from "./user.repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {ApiError} from "../../utils/api-error";

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key'; // добавим в .env

class UserService {
    async register(data:{
        fullName: string,
        birthDate: Date,
        email: string,
        password: string
    }): Promise<any>{
        const { fullName, birthDate, email, password } = data;

        //проверяем есть ли уже такой email

        const existing = await userRepository.findByEmail(email);

        if (existing) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует');
        }

        //хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя
        const user = await userRepository.createUser({
            fullName,
            birthDate,
            email,
            password: hashedPassword,
        });

        // Убираем пароль из ответа
        const userObj = user.toObject();
        delete userObj.password;

        return userObj;
    }

    async login(email: string, password: string) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw  ApiError.BadRequest('неверный email или пароль ')
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw  ApiError.BadRequest('неверный email или пароль ')
        }

        //генерируем токен
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        )
        return {accessToken: token}
    }

    async getById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw ApiError.NotFound('Пользователь не найден');
        }
        const userObj = user.toObject();
        delete userObj.password;

        return userObj;
    }

    async getAllUsers() {
        const users = await userRepository.findAll();
        return users.map(u =>{
            const obj = u.toObject();
            delete obj.password;
            return obj;
        })
    }

    async blockUser(id:string) {
        const updated = await userRepository.updateStatus(id, false);
        if (!updated) throw ApiError.NotFound('Пользователь не найден');

        const obj = updated.toObject();
        delete obj.password;
        return obj;
    }
}

export default new UserService();