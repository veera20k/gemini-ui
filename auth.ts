import { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_APP_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string
        }),
    ]
};
