declare module "next-auth" {
  interface User {
    userdata: {
      name: string;
      email: string;
      rule: string;
    };
    tokendata: string;
  }

  interface Session {
    user: User["userdata"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User["userdata"];
    idToken?: string;
  }
}
