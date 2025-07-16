import { UserModel, IUser } from './user.model';

class UserRepository {
    async createUser(data: Partial<IUser>): Promise<IUser> {
        return UserModel.create(data);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email });
    }

    async findById(id: string): Promise<IUser | null> {
        return UserModel.findById(id);
    }

    async findAll(): Promise<IUser[]> {
        return UserModel.find();
    }

    async updateStatus(id: string, isActive: boolean): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate(id, { isActive }, { new: true });
    }
}

export default new UserRepository();
