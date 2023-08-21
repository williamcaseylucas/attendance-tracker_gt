"use client";
import SignIn from "../components/SignIn";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignIn />
    </div>
  );
};

export default Login;
