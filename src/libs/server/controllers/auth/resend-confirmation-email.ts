import { getUserByEmail } from "@/libs/server/database/user";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { errorHandler } from "@/libs/server/errors/errorHandler";
import { generateToken } from "@/libs/server/services/auth";
import { sendConfirmationRegisterEmail } from "@/libs/server/services/email";
import { NextRequest, NextResponse } from "next/server";

export async function resendConfirmationEmailController(req: NextRequest) {
    const { email } = await req.json();
    try {
        if (!email) {
            throw new ValidationError("Le champ e-mail est requis");
        }
        const user = await getUserByEmail(email);

        if (user && !user.isVerified) {
            if (!process.env.JWT_EMAIL_SECRET) {
                throw new Error("JWT_EMAIL_SECRET is not defined");
            }
            const secret = new TextEncoder().encode(process.env.JWT_EMAIL_SECRET);
            const token = await generateToken({ id: user.id, email, type: "email_confirmation" }, "1h", secret);
            await sendConfirmationRegisterEmail(user.firstname, user.email, token);
        }
        return NextResponse.json(
            { message: "Si un compte existe avec cet email, un lien de confirmation sera envoyé." },
            { status: 200 }
        );
    } catch (error) {
        return errorHandler(error);
    }
}
