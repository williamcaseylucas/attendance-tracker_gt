import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return (
          profile?.email_verified &&
          profile?.email &&
          profile?.email.endsWith("@gmail.com")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// function GoogleProvider(arg0: {
//   clientId: string | undefined;
//   clientSecret: string | undefined;
// }) {
//   throw new Error("Function not implemented.");
// }

// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const authOptions: NextAuthOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (account?.provider === "google") {
//         return (
//           profile?.email_verified && profile?.email.endsWith("@example.com")
//         );
//       }
//       return true; // Do different verification for other providers that don't have `email_verified`
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export default handler;
