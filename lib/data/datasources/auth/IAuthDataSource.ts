import { SignUpResponseState } from "@lib/data/models/auth/SignUpServerActionModel";
import { LoginAuthResponse } from "@lib/data/models/user/AuthUserModel";
import { SignUpValidationDataModel } from "@model/auth/SignUpValidationDataModel";

export interface IAuthDataSource {
  login(email: String, password: String): Promise<LoginAuthResponse>;
  signUp(data: SignUpValidationDataModel): Promise<SignUpResponseState>;
}
