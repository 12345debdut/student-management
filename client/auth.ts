import { signIn } from "next-auth/react";

type ErrorCallBackFunctionType = (a: string) => void;
export const logInWithCred = async (
  cred: LoginCredential,
  successCallBack: Function,
  errorCallBack: ErrorCallBackFunctionType
) => {
  const res = await signIn("credentials", {
    email: cred.email,
    password: cred.password,
    redirect: false,
  });
  console.log("Response: " + res?.ok);
  if (res?.status === 200 && (res?.error?.length ?? 0) == 0) {
    successCallBack();
  } else {
    errorCallBack(res?.error ?? "");
  }
};

export interface LoginCredential {
  email: string;
  password: string;
}
