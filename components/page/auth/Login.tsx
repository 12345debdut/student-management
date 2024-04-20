import React from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { Card } from "@components/atoms/ui/card";
import { SIGN_UP } from "@lib/config/urls";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  return (
    <div className="w-full lg:min-h-[100vh] xl:min-h-[100vh] flex items-center justify-center">
      <Card className="py-12 px-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Login</h1>
            <p className="text-balance text-accent">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm {...props} />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={SIGN_UP} className="underline text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
