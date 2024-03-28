import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    uid: string;
    name: string;
    email: string;
  }
  interface Session {
    user: {
        uid: string;
        name: string;
        email: string;
    }
  }
}