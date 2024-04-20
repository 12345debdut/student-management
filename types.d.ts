import {
  AuthUserModel,
  LoginAuthResponse,
  LoginValidationError,
} from "@lib/data/models/user/AuthUserModel";
import "next-auth";

declare module "next-auth" {
  export interface User extends LoginAuthResponse {}
}
