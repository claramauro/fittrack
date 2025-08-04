import { UserClient } from "@/libs/types/user";

export async function fetchUser(): Promise<UserClient | null> {
    const response = await fetch("/api/me");
    if (!response.ok) {
        throw new Error("Error lors du chargement, veuillez réessayer.");
    }
    const data = await response.json();
    return data;
}
