import { UserModel, IUser, UserDocument } from './user.model';

class UserRepository {
    async createUser(data: Partial<IUser>): Promise<UserDocument> {
        return UserModel.create(data);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return UserModel.findOne({ email });
    }

    async findById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id);
    }

    async findAll(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async updateStatus(id: string, isActive: boolean): Promise<UserDocument | null> {
        return UserModel.findByIdAndUpdate(id, { isActive }, { new: true });
    }
}

export default new UserRepository();
