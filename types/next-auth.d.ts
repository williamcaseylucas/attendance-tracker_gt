import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      uid: string;
    };
  }

  interface User {}

  interface Account {
    provider: string;
  }

  interface Profile {
    email_verified: boolean;
    email: string;
  }
}
