import { SignUpResponseState } from "@lib/data/models/auth/SignUpServerActionModel";
import { SignUpValidationDataModel } from "@lib/data/models/auth/SignUpValidationDataModel";
import {
  LoginAuthResponse,
  LoginValidationError,
} from "@lib/data/models/user/AuthUserModel";

export interface IAuthRepository {
  login(email: String, password: String): Promise<LoginAuthResponse>;
  validateSignUpDetails(
    data: SignUpValidationDataModel
  ): Promise<SignUpResponseState>;
  signUp(data: SignUpValidationDataModel): Promise<SignUpResponseState>;
  validateSignInRequest(error: LoginValidationError): Promise<boolean>;
}
