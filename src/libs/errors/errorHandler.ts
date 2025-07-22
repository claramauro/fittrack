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
        return new Response(JSON.stringify({ message: err.issues[0]?.message || "Données invalides" }), {
            status: 400,
            headers,
        });
    }
    return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500, headers });
}
