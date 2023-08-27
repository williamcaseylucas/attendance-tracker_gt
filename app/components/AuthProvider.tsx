"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
