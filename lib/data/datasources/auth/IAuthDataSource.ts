import { AuthUserModel } from "@lib/data/models/user/AuthUserModel";

export interface IAuthDataSource {
    login(email: String, password: String): Promise<AuthUserModel | undefined>
}