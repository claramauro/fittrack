import { UserError } from "./customErrors";

type ErrorResponse = {
    message: string;
    type: string;
    errors?: { field: string; message: string }[];
};

export function errorHandler(err: unknown) {
    console.log(err);
    const headers = {
        "Content-Type": "application/json",
    };

    if (err instanceof UserError) {
        const response: ErrorResponse = {
            message: err.message,
            type: "userError",
        };

        if ("errors" in err && Array.isArray(err.errors)) {
            response.errors = err.errors;
        }

        return new Response(JSON.stringify(response), {
            status: err.statusCode,
            headers,
        });
    }

    return new Response(JSON.stringify({ message: "Une erreur est survenue, veuillez réessayer." }), {
        status: 500,
        headers,
    });
}
