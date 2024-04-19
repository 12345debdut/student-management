export interface AuthUserModel {
    email: String,
    username: String,
    image: String,
    role: UserRole,
    id: String,
    password: String
}

export enum UserRole {
    READ_ONLY_ADMIN,
    READ_WRITE_ADMIN,
    USER
}

