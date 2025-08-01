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
        if (data.type === "userError") {
            throw new FormError(data.message, data.errors, data.type);
        }
        throw new Error("Une erreur est survenue, veuillez réessayer.");
    }
    return data;
}

export async function logout() {
    const response = await fetch("/api/logout", {
        method: "POST",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Une erreur est survenue, veuillez réessayer.");
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
        if (!response.ok) {
            if (data.type === "userError") {
                throw new FormError(data.message, data.errors, data.type);
            }
            throw new Error("Une erreur est survenue, veuillez réessayer.");
        }
    }
    return data;
}

export async function resendConfirmationEmail(email: string) {
    const response = await fetch("/api/resend-confirmation-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }
    return data;
}
