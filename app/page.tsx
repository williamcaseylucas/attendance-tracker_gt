"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  image: string;
}

interface Session {
  user: User;
}

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  console.log(session?.user?.name);
  console.log(session?.user?.email);
  console.log(session?.user?.image);

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex items-center justify-center h-[calc(100%-3.5rem)]">
      <div>
        <Link href="/classrooms">
          <button className="bg-blue-200 rounded-lg p-3">
            Go to classrooms
          </button>
        </Link>
      </div>
    </div>
  );
}
