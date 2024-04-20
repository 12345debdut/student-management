import {
  AuthUserModel,
  LoginAuthResponse,
  LoginValidationError,
  UserRole,
} from "@lib/data/models/user/AuthUserModel";
import { IAuthDataSource } from "./IAuthDataSource";
import { PrismaClient, Role } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { DB_CLIENT } from "@di/constants";
import { SignUpValidationDataModel } from "@lib/data/models/auth/SignUpValidationDataModel";
import {
  ResponseType,
  SignUpResponseState,
} from "@lib/data/models/auth/SignUpServerActionModel";
import bcrypt from "bcrypt";

@injectable()
export class AuthDataSourceImpl implements IAuthDataSource {
  private prismaClient: PrismaClient;

  constructor(@inject(DB_CLIENT) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  async login(email: String, password: String): Promise<LoginAuthResponse> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: email.toString(),
      },
    });
    if (user === null || user === undefined) {
      return { error: LoginValidationError.USER_NOT_FOUND };
    } else {
      if (user?.approved == true) {
        return {
          user: {
            email: user?.email ?? email,
            username:
              (user?.firstName ?? "") + " " + (user?.lastName ?? "") ?? "",
            image: "",
            role: this.transformRole(user?.role ?? Role.USER),
            id: user?.id?.toString() ?? "",
            password: user?.password ?? "",
          },
          error: LoginValidationError.NONE,
        };
      } else {
        return {
          error: LoginValidationError.ACTIVATION_ERROR,
        };
      }
    }
  }

  async signUp(data: SignUpValidationDataModel): Promise<SignUpResponseState> {
    try {
      let currentIsoString = new Date().toISOString();
      let existingUser = await this.prismaClient.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (existingUser != null && existingUser?.id != null) {
        return {
          message: "User already exists please signup with different id",
          responseType: ResponseType.ERROR,
        };
      }
      let response = await this.prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          lastLogin: null,
          lastUpdatedTime: currentIsoString,
          image: "",
          role: Role.USER,
          password: await this.hashPassword(data.password),
        },
      });
      if (response != null && response.id != null && response.id != undefined) {
        return { message: "", responseType: ResponseType.SUCEESS };
      } else {
        return {
          message: "Something went wrong!!",
          responseType: ResponseType.SUCEESS,
        };
      }
    } catch (error: any) {
      console.log("Error: " + error.message);
      return {
        message: "Unhandled error occured during user creation!!",
        responseType: ResponseType.ERROR,
      };
    }
  }

  async hashPassword(password: string): Promise<string> {
    let response = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, response);
  }

  transformRole(role: Role): UserRole {
    let userRole: UserRole;
    switch (role) {
      case Role.READ_ONLY_ADMIN:
        userRole = UserRole.READ_ONLY_ADMIN;
        break;
      case Role.READ_WRITE_ADMIN:
        userRole = UserRole.READ_WRITE_ADMIN;
        break;
      case Role.USER:
        userRole = UserRole.USER;
        break;
      default:
        userRole = UserRole.USER;
        break;
    }
    return userRole;
  }
}
