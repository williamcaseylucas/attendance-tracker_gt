"use client";
import { signIn, useSession } from "next-auth/react";
type Props = {};

const SignIn = (props: Props) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-slate-300 rounded-lg p-3"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
