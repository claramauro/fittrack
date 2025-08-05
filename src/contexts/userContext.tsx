"use client";

import { fetchUser } from "@/libs/client/services/user";
import { UserClient } from "@/libs/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: UserClient | null;
    isLoading: boolean;
    error: string;
}

const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserClient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        async function loadUser() {
            try {
                setIsLoading(true);
                const user = await fetchUser();
                setUser(user);
            } catch {
                setError("Error lors du chargement des données, veuillez réessayer en rechargeant la page.");
            } finally {
                setIsLoading(false);
            }
        }
        loadUser();
    }, []);

    return <UserContext.Provider value={{ user, isLoading, error }}>{children}</UserContext.Provider>;
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être utilisé dans un UserProvider");
    }
    return context;
}
