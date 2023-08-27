"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Students from "./students/page";
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
  return redirect("/students");
  return (
    <div>
      <Students />
    </div>
  );
}
