import { Schema, model, Document, HydratedDocument  } from 'mongoose';

export enum UserType {
    admin = 'admin',
    user = 'user',
}
export interface IUser extends Document {
    fullName: string;
    birthDate: Date;
    email: string;
    password: string;
    role: UserType;
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
        role: { type: String, enum:UserType, default: UserType.user },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true, versionKey: false }
);


export const UserModel = model<IUser>('User', UserSchema);
