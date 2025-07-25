import { FormError } from "../errors/customErrors";

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

export async function logout() {
    const response = await fetch("/api/logout", {
        method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue, veuillez réessayer.");
    }
    return data;
}

export async function register(formData: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}) {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new FormError(data.message || "Une erreur est survenue, veuillez réessayer.", data.errors);
    }
    return data;
}
