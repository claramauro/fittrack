import { generateToken, hashPassword } from "@/libs/server/services/auth";
import { createUser, getUserByEmail } from "@/libs/server/database/user";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { errorHandler } from "@/libs/server/errors/errorHandler";
import { registerSchema } from "@/libs/validation/authSchema";
import { NextRequest, NextResponse } from "next/server";
import { sendConfirmationRegisterEmail } from "@/libs/server/services/email";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const validationResult = registerSchema.safeParse(body);
        if (validationResult.error) {
            const errors = validationResult.error.issues.map((issue) => ({
                field: issue.path[0] as string,
                message: issue.message,
            }));
            throw new ValidationError("Données invalides, veuillez corriger et soumettre à nouveau", 400, errors);
        }

        const user = await getUserByEmail(body.email);

        if (user) {
            throw new ValidationError("Impossible de créer le compte avec ces informations.", 409);
        }
        const hashedPassword = await hashPassword(body.password);
        const userData = { ...body, password: hashedPassword };
        delete userData.confirmPassword;
        const userId = await createUser(userData);

        const token = await generateToken({ id: userId, email: userData.email, type: "email_conformation" }, "1h");
        await sendConfirmationRegisterEmail(userData.firstname, userData.email, token);
        return NextResponse.json({ message: "Succès" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
