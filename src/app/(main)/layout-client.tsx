"use client";

import { SessionProvider } from "next-auth/react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <main className="container flex-1 flex flex-col">{children}</main>
        </SessionProvider>
    );
}
