// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            firstname: string;
            lastname: string;
        } & DefaultSession["user"];
    }

    interface User {
        firstname: string;
        lastname: string;
    }
}
