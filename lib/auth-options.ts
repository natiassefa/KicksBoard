import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firestore";
import "firebase/firestore"


export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "password",  
          type: "password",
          placeholder: "",
        },
      },
      async authorize(credentials): Promise<User | null> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || "", (credentials as any).password || "")
          .then((userCredential) => {
            if (userCredential.user) {
              const user: User = {
                id: userCredential.user.uid,
                uid: userCredential.user.uid,
                email: userCredential.user.email!,
                name: userCredential.user.displayName!,
              };
              return user;
            }
            return null;
          })
          .catch(error => {
            console.log(error);
            return null;
          });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/", //sigin page
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.uid = token.sub!;
      }
      return session;
    }
  }
};
