import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const NextOption = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(Credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "post",
            body: JSON.stringify({
              email: Credentials?.email,
              password: Credentials?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.message == "success") {
          const decodedtoken: { id: string } = jwtDecode(data.token);
          return {
            id: decodedtoken.id,
            userdata: data.user,
            tokendata: data.token,
          };
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.token = user.tokendata;
        token.user = user.userdata;
      }
      return token;
    },

    async session({ session, token }: any) {
      console.log(session, token, "inside callbacks in routes");
      session.user = token.user;
      return session;
    },
  },
};

// @ts-expect-error todo
const handler = NextAuth(NextOption);

export { handler as GET, handler as POST };
