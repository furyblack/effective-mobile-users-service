import {UserDocument, UserType} from "../users/user.model";

export class UserOutputDto {
    id!: string;
    fullName!:string
    birthDate!: string
    email!:string
    role!: UserType
    isActive!: boolean

    static mapToOutput(user: UserDocument): UserOutputDto {
        return  {
            id: user.id.toString(),
            fullName: user.fullName,
            birthDate: user.birthDate.toISOString(),
            email: user.email,
            role: user.role,
            isActive: user.isActive
        }
    }
}