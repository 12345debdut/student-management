"use client";
import { MutableRefObject, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logInWithCred } from "@client/auth";

interface LoginHookPropModel {
  callbackUrl: string;
}
interface LoginHookModel {
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
  goBack(): void;
  email: MutableRefObject<string>;
  password: MutableRefObject<string>;
  error: string;
}
export const useLogin = (props: LoginHookPropModel): LoginHookModel => {
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const [error, setError] = useState<string>("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logInWithCred(
      { email: email.current, password: pass.current },
      () => {
        goBack();
      },
      (error: string) => {
        setError(error);
      }
    );
  };
  const goBack = () => {
    router.replace(props.callbackUrl);
  };
  return {
    onSubmit,
    goBack,
    email,
    password: pass,
    error,
  };
};
