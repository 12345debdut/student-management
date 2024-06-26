import "reflect-metadata";
import { Card } from "@components/atoms/ui/card";
import SignUpForm from "@components/page/auth/SignUpForm";
import SignInButton from "@components/page/auth/signInButton";

export default function SignUp() {
  return (
    <div className="w-full lg:min-h-[100vh] xl:min-h-[100vh] flex items-center justify-center">
      <Card className="p-6">
        <div className="mx-auto grid w-[400px] gap-6 place-content-center">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-primary">Sign up</h1>
            <p className="text-balance text-accent">
              Enter your relevant information for sign in up to this site
            </p>
          </div>
          <SignUpForm />
          <SignInButton />
        </div>
      </Card>
    </div>
  );
}
