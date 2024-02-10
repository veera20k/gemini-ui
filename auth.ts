import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import connect from "./lib/mongo/client";
import User from "./lib/mongo/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter userName" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credential) {
                const userName = credential?.username;
                await connect();
                const user = await User.findOne({ userName });
                if (user) {
                    return user;
                }
                return null
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token._id && session?.user) {
                session.user._id = token._id;
                session.user.image = token.image;
                session.user.userName = token.userName;
                delete session.user.name;
                delete session.user.email;
              }
            return session;
        },
        async jwt({ token }) {
            if (!token._id && token.sub) {
                await connect();
                const user = await User.findOne({ _id: token.sub });
                token._id = user._id;
                token.image = user.image || 'https://robohash.org/stefan-one';
                token.userName = user.userName;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
export const handler = NextAuth(authOptions)