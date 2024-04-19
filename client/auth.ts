import { signIn } from "next-auth/react";

export const logInWithCred = async (
  cred: LoginCredential,
  successCallBack: Function,
  errorCallBack: Function
) => {
  const res = await signIn("credentials", {
    email: cred.email,
    password: cred.password,
    redirect: false,
  });
  if (res?.error === "CredentialsSignin") {
    errorCallBack();
  } else {
    successCallBack();
  }
};

export interface LoginCredential {
  email: string;
  password: string;
}
