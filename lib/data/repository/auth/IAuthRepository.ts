import { User } from "next-auth";

export interface IAuthRepository {
    login(email: String, password: String): Promise<User | null>
}