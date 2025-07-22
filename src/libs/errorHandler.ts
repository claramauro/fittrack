import { ZodError } from "zod";

export function errorHandler(err: unknown) {
    console.log("ici", err);
    const headers = {
        "Content-Type": "application/json",
    };
    if (err instanceof ZodError) {
        return new Response(JSON.stringify({ message: err.issues[0]?.message || "Données invalides" }), {
            status: 400,
            headers,
        });
    }
    return new Response(JSON.stringify({ message: "Internal Error" }), { status: 500, headers });
}
