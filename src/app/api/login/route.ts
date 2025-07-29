import { authenticateUser, generateToken } from "@/libs/server/services/auth";
import { errorHandler } from "@/libs/server/errors/errorHandler";
import { loginSchema } from "@/libs/validation/authSchema";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "@/libs/server/errors/customErrors";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const validationResult = loginSchema.safeParse(body);
        if (validationResult.error) {
            const errors = validationResult.error.issues.map((issue) => ({
                field: issue.path[0] as string,
                message: issue.message,
            }));
            throw new ValidationError("Données invalides, veuillez corriger et soumettre à nouveau", 400, errors);
        }
        const { email, password } = validationResult.data;
        const user = await authenticateUser(email, password);
        const jwt = await generateToken({ id: user.id, email: user.email });

        const response = NextResponse.json({ message: "Connexion réussie" }, { status: 200 });
        response.cookies.set({
            name: "auth_token",
            value: jwt,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
