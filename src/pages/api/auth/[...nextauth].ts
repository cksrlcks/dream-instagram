import { createUser } from "@/service/user";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user: { id, name, email, image } }) {
            if (!email) {
                return false;
            }
            createUser({
                id,
                name: name || "",
                email,
                image,
                username: email.split("@")[0] || "",
            });

            return true;
        },
        async session({ session }) {
            const user = session?.user;
            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split("@")[0] || "",
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
};
export default NextAuth(authOptions);
