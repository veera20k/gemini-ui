import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      _id: string,
      image: string,
      userName: string,
    } & DefaultSession["user"]
  }
  interface User {
    _id: string,
    image: string,
    userName: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string,
    image: string,
    userName: string,
  }
}
