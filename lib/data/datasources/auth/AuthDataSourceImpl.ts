import { AuthUserModel, UserRole } from '@lib/data/models/user/AuthUserModel';
import { IAuthDataSource } from './IAuthDataSource';
import prismaClient from '@db/clientObj';
import { Role } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class AuthDataSourceImpl implements IAuthDataSource {
    async login(email: String, password: String): Promise<AuthUserModel|undefined> {
        const user = await prismaClient.user.findFirst({
            where: {
              email: email.toString()
            }
          })
          if(user === null || user === undefined) {
            return undefined
          } else {
            return {
                email: user?.email ?? email,
                username: (user?.firstName ?? "") + " " + (user?.lastName ?? "") ?? "",
                image: "",
                role: this.transformRole(user?.role ?? Role.USER),
                id: user?.id?.toString() ?? "",
                password: user?.password ?? ""
            }
          }
    }

    transformRole(role: Role): UserRole {
        let userRole: UserRole;
        switch(role) {
            case Role.READ_ONLY_ADMIN : 
                userRole = UserRole.READ_ONLY_ADMIN
                break
            case Role.READ_WRITE_ADMIN : 
                userRole = UserRole.READ_WRITE_ADMIN
                break
            case Role.USER : 
                userRole = UserRole.USER
                break
            default : 
                userRole = UserRole.USER
                break
        }
        return userRole
    }
}