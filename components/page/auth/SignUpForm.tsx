"use client";
import { Label } from "@components/atoms/ui/label";
import { Input } from "@components/atoms/ui/input";
import { Button } from "@components/atoms/ui/button";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@lib/actions/auth/SignUpActions";
import { ResponseType } from "@lib/data/models/auth/SignUpServerActionModel";
import { useEffect } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(createUser, {
    message: "",
    responseType: ResponseType.NONE,
  });
  useEffect(() => {
    if (state.responseType == ResponseType.SUCEESS) {
      redirect("/", RedirectType.replace);
    }
  }, [state]);
  return (
    <form className="grid gap-4" action={dispatch}>
      <div className="grid grid-cols-2 gap-4 p-1">
        <div className="grid gap-2">
          <Label htmlFor="firstname">First Name</Label>
          <Input
            id="firstname"
            type="text"
            name="firstname"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="grid gap-2 p-1">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          name="email"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 p-1">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="enter your password"
            required
            name="password"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            id="confirmpassword"
            type="password"
            placeholder="enter your password"
            required
            name="confirmpassword"
          />
        </div>
      </div>
      {state.message.length != 0 && (
        <div>
          <Label htmlFor="error" className="text-error font-medium">
            {state.message}
          </Label>
        </div>
      )}
      <SignUpButton />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </form>
  );
}

function SignUpButton() {
  let { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Sign up"}
    </Button>
  );
}
