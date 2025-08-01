"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            await fetch("/api/me");
        }
        fetchUser();
    }, []);

    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être utilisé dans un UserProvider");
    }
    return context;
}
