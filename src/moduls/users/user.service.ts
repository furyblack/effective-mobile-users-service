import userRepository from "./user.repository";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {ApiError} from "../../utils/api-error";
import {RegisterDto, UserDocument} from "./user.model";

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

class UserService {
    async register(data: RegisterDto): Promise<UserDocument> {
        const existing = await userRepository.findByEmail(data.email);
        if (existing) throw ApiError.badRequest('User with this email already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await userRepository.createUser({...data, password: hashedPassword});
    }

    async login(email: string, password: string): Promise<UserDocument> {
        const user = await userRepository.findByEmail(email);
        if (!user) throw ApiError.unauthorized('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw ApiError.unauthorized('Invalid email or password');

        return user;
    }

    async generateToken(user: UserDocument): Promise<string> {
        return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return userRepository.findById(id);
    }

    async findAll(): Promise<UserDocument[]> {
        return userRepository.findAll();
    }

    async blockUser(id: string): Promise<UserDocument | null> {
        return userRepository.updateStatus(id, false);
    }
}

export const userService = new UserService();
