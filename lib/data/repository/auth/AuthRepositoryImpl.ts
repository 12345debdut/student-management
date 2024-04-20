import { User } from "next-auth";
import { IAuthRepository } from "./IAuthRepository";
import { type IAuthDataSource } from "@dataSource/auth/IAuthDataSource";
import { inject, injectable } from "tsyringe";
import { AUTH_DATA_SOURCE } from "@di/constants";
import * as bcrypt from "bcrypt";
import {
  LoginValidationError,
  type AuthUserModel,
  type LoginAuthResponse,
} from "@lib/data/models/user/AuthUserModel";
import {
  ResponseType,
  SignUpResponseState,
} from "@lib/data/models/auth/SignUpServerActionModel";
import { z } from "zod";
import { type SignUpValidationDataModel } from "@lib/data/models/auth/SignUpValidationDataModel";

@injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  private authDataSource: IAuthDataSource;
  constructor(@inject(AUTH_DATA_SOURCE) dataSource: IAuthDataSource) {
    this.authDataSource = dataSource;
  }
  async login(email: String, password: String): Promise<LoginAuthResponse> {
    var response = await this.authDataSource.login(email, password);
    return response.user == null
      ? response
      : this.buildUserObject(password, response);
  }

  async validateSignUpDetails(
    data: SignUpValidationDataModel
  ): Promise<SignUpResponseState> {
    const emailSchema = z.coerce.string().email().min(12);
    const passwordSchema = z.coerce
      .string()
      .min(8)
      .regex(
        RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
      );
    const userNameSchema = z.coerce.string();
    let emailValidation = await this.validate(emailSchema, data.email);
    let firstNameValidation = await this.validate(
      userNameSchema,
      data.firstName
    );
    let lastNameValidation = await this.validate(userNameSchema, data.lastName);
    let passwordValodation = await this.validate(passwordSchema, data.password);

    if (!emailValidation.success) {
      return {
        message: "Please enter a valid email",
        responseType: ResponseType.ERROR,
      };
    }
    if (!firstNameValidation.success) {
      return {
        message: "Please enter valid first name",
        responseType: ResponseType.SUCEESS,
      };
    }

    if (!lastNameValidation.success) {
      return {
        message: "Please enter a valid lastname",
        responseType: ResponseType.ERROR,
      };
    }

    if (!passwordValodation.success) {
      return {
        message: "Please enter a valid password",
        responseType: ResponseType.ERROR,
      };
    }

    if (data.password != data.confirmPass) {
      return {
        message: "password and confirm password should be matched",
        responseType: ResponseType.ERROR,
      };
    }

    return {
      message: "",
      responseType: ResponseType.SUCEESS,
    };
  }

  async validate(
    schema: z.ZodSchema,
    data: any
  ): Promise<z.SafeParseReturnType<any, any>> {
    return await schema.safeParseAsync(data);
  }

  async signUp(data: SignUpValidationDataModel): Promise<SignUpResponseState> {
    return await this.authDataSource.signUp(data);
  }

  async validateSignInRequest(error: LoginValidationError): Promise<boolean> {
    switch (error) {
      case LoginValidationError.ACTIVATION_ERROR:
        console.log("Here!!");
        throw Error(
          "Your account is under review please check with administrator"
        );
      case LoginValidationError.USER_NOT_FOUND:
        throw Error("User does not exists please try with another credential");
      case LoginValidationError.PASSWORD_MISMATCH:
        throw Error(
          "User password is not matching please try again with correct password"
        );
      default:
        return true;
    }
  }

  private async buildUserObject(
    password: String,
    authResponse: LoginAuthResponse
  ): Promise<LoginAuthResponse> {
    console.log("password: " + authResponse.user?.password);
    if (await this.checkPassWord(authResponse.user?.password ?? "", password)) {
      return authResponse;
    } else {
      return { ...authResponse, error: LoginValidationError.PASSWORD_MISMATCH };
    }
  }

  private async checkPassWord(
    dataBasePassword: String,
    password: String
  ): Promise<Boolean> {
    return await bcrypt.compare(
      password.toString(),
      dataBasePassword.toString()
    );
  }
}
