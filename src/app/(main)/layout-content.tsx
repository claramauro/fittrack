"use client";

import { SessionProvider } from "next-auth/react";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <main className="container flex-1 flex flex-col">{children}</main>
        </SessionProvider>
    );
}
