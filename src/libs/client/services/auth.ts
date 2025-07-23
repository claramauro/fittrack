export async function login(email: string, password: string) {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue, veuillez réessayer.");
    }
    return data;
}
