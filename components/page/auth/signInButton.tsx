"use client";
import { signIn } from "next-auth/react";
export default function SignInButton() {
  return (
    <div className="w-full text-center text-sm flex">
      <div className="flex-grow"></div>
      <div className="flex">
        <p>Already have an account?</p>
        <div
          onClick={() => signIn()}
          className="underline text-primary cursor-pointer ml-2"
        >
          Sign In
        </div>
      </div>
    </div>
  );
}
