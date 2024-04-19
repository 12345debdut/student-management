import { User } from "next-auth";
import { IAuthRepository } from "./IAuthRepository";
import { type IAuthDataSource } from "@dataSource/auth/IAuthDataSource";
import { inject, injectable } from "tsyringe";
import { AUTH_DATA_SOURCE } from "@di/constants";
import * as bcrypt from "bcrypt"
import { type AuthUserModel } from "@lib/data/models/user/AuthUserModel";

@injectable()
export class AuthRepositoryImpl implements IAuthRepository {
    private authDataSource: IAuthDataSource
    constructor(@inject(AUTH_DATA_SOURCE) dataSource: IAuthDataSource) {
        this.authDataSource = dataSource
    }
    async login(email: String, password: String): Promise<User | null> {
        console.log("Repository: "+ email +" and Password: "+ password)
        var user = await this.authDataSource.login(email, password)
        if (user !== undefined) {
            return this.buildUserObject(email, password, user)
        } else {
            return null
        }
    }

    private async buildUserObject(email: String, password: String, user: AuthUserModel): Promise<User | null> {
        if (await this.checkPassWord(user.password, password)) {
            return {
                email: user.email.toString(),
                id: user.id.toString(),
                name: user.username.toString(),
                image: user.image.toString()
            }
        } else {
            return null
        }
    }

    private async checkPassWord(dataBasePassword: String, password: String): Promise<Boolean> {
        return await bcrypt.compare(password.toString(), dataBasePassword.toString())
    }
}