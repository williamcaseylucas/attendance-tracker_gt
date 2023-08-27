import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const validUsers = ["williamcaseylucas@gmail.com"];

const checkValidUsers = (user: string) => {
  for (let i = 0; i < validUsers.length; i++) {
    if (user === validUsers[i]) return true;
  }
  return false;
};

const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // Allows us to get a new token every time we login and not just the first time
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const isValidUser =
          profile?.email_verified &&
          profile?.email &&
          profile?.email.endsWith("@gmail.com") &&
          checkValidUsers(profile.email);

        // Return a string or boolean value wrapped in a Promise.resolve()
        // return Promise.resolve(
        //   isValidUser ? "authenticated" : "unauthenticated"
        // );
        return isValidUser ? true : "";
      }
      return "";
      // return Promise.resolve("authenticated");
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
