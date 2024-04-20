"use server";
import "reflect-metadata";
import { serverContainer } from "@di/dependencyInjection";
import {
  ResponseType,
  type SignUpResponseState,
} from "@lib/data/models/auth/SignUpServerActionModel";
import { type IAuthRepository } from "@lib/data/repository/auth/IAuthRepository";
import { SignUpValidationDataModel } from "@lib/data/models/auth/SignUpValidationDataModel";
import { AUTH_REPOSITORY } from "@di/constants";

export async function createUser(
  prevState: SignUpResponseState,
  formData: FormData
): Promise<SignUpResponseState> {
  let email = formData.get("email")?.toString() ?? "";
  let password = formData.get("password")?.toString() ?? "";
  let confirmPassword = formData.get("confirmpassword")?.toString() ?? "";
  let firstName = formData.get("firstname")?.toString() ?? "";
  let lastName = formData.get("lastname")?.toString() ?? "";
  let authRepository =
    serverContainer.resolve<IAuthRepository>(AUTH_REPOSITORY);
  let data: SignUpValidationDataModel = {
    email,
    password,
    confirmPass: confirmPassword,
    firstName,
    lastName,
  };
  let response = await authRepository?.validateSignUpDetails(data);
  if (response?.responseType == ResponseType.ERROR) {
    return response;
  }
  return await authRepository?.signUp(data);
}
