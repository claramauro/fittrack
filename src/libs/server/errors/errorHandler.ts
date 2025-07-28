import { ZodError } from "zod";
import { ValidationError } from "./customErrors";

export function errorHandler(err: unknown) {
    console.log(err);
    const headers = {
        "Content-Type": "application/json",
    };
    if (err instanceof ValidationError) {
        return new Response(JSON.stringify({ message: err.message || "Données invalides" }), {
            status: err.statusCode || 400,
            headers,
        });
    }
    if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
            field: issue.path[0],
            message: issue.message,
        }));

        return new Response(
            JSON.stringify({ message: "Données invalides, veuillez corriger et soumettre à nouveau", errors }),
            {
                status: 400,
                headers,
            }
        );
    }
    return new Response(JSON.stringify({ message: "Erreur interne, veuillez réessayer." }), { status: 500, headers });
}
