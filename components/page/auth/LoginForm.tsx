"use client";
import { Button } from "@components/atoms/ui/button";
import { Input } from "@components/atoms/ui/input";
import { Label } from "@components/atoms/ui/label";
import { useLogin } from "@hook/auth/login";
import Link from "next/link";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

export default function LoginForm(props: Props) {
  const { email, password, onSubmit, error, goBack } = useLogin({
    callbackUrl: props.callbackUrl ?? "/",
  });
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          onChange={(e) => (email.current = e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline text-primary"
          >
            Forgot your password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="enter your password"
          required
          onChange={(e) => (password.current = e.target.value)}
        />
      </div>
      {error.length != 0 && (
        <div>
          <Label htmlFor="error" className="text-error font-medium">
            {error}
          </Label>
        </div>
      )}
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button variant="outline" className="w-full" onClick={() => goBack()}>
        Cancel
      </Button>
    </form>
  );
}
