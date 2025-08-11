import { authenticateUser } from "@/libs/server/services/auth";
import { loginSchema } from "@/libs/validation/authSchema";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt" as const,
        maxAge: 60 * 60 * 24,
    },
    jwt: {
        maxAge: 60 * 60 * 24,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/connexion",
        signOut: "/connexion",
        //error: "/error"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email ?? "";
                const password = credentials?.password ?? "";
                const validationResult = loginSchema.safeParse({ email, password });

                if (validationResult.error) {
                    return null;
                }

                const user = await authenticateUser(email, password);
                if (user) {
                    return {
                        id: String(user.id),
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && "firstname" in user && "lastname" in user) {
                token.firstname = user.firstname as string;
                token.lastname = user.lastname as string;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub ?? "";
                session.user.email = token.email;
                session.user.firstname = token.firstname as string;
                session.user.lastname = token.lastname as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
