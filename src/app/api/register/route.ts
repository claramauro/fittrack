import { getUserByEmail } from "@/libs/server/database/user";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { errorHandler } from "@/libs/server/errors/errorHandler";
import { registerSchema } from "@/libs/validation/authSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const validationResult = registerSchema.safeParse(body);
        if (validationResult.error) {
            throw validationResult.error;
        }

        const user = await getUserByEmail(body.email);

        if (user) {
            throw new ValidationError("Impossible de créer le compte avec ces informations.", 409);
        }

        // Vérif si email existe deja
        // Ajouter en BDD
        // Envoie mail
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
