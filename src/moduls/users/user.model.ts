import { Schema, model, Document, HydratedDocument  } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface IUser extends Document {
    fullName: string;
    birthDate: Date;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
}

export type UserDocument = HydratedDocument<IUser>
export type RegisterDto = Omit<IUser, 'role' | 'isActive'>;
export type LoginDto = Pick<IUser, 'email' | 'password'>;

const UserSchema = new Schema<IUser>(
    {
        fullName: { type: String, required: true },
        birthDate: { type: Date, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);
