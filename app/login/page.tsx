"use client";
import SignIn from "../components/SignIn";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const Login = (props: Props) => {
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    if (session) {
      return redirect("/");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignIn />
    </div>
  );
};

export default Login;
