import { signIn, useSession } from "next-auth/react";
type Props = {};

const SignIn = (props: Props) => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4">
        <button onClick={() => signIn("google")} className="text-red-600">
          Sign In
        </button>
      </div>
    );
  }

  return <div>SignIn</div>;
};

export default SignIn;
