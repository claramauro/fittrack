import { generateToken, hashPassword } from "@/libs/server/services/auth";
import { createUser, getUserByEmail, updateUser } from "@/libs/server/database/user";
import { ConflictError, ValidationError } from "@/libs/server/errors/customErrors";
import { errorHandler } from "@/libs/server/errors/errorHandler";
import { registerSchema } from "@/libs/validation/authSchema";
import { NextRequest, NextResponse } from "next/server";
import { sendConfirmationRegisterEmail } from "@/libs/server/services/email";

async function generateTokenAndSendMail(
    id: string,
    email: string,
    firstname: string,
    secret: Uint8Array<ArrayBufferLike>
) {
    const token = await generateToken({ id, email, type: "email_confirmation" }, "1h", secret);
    if (process.env.SEND_MAIL === 'true'){
        return sendConfirmationRegisterEmail(firstname, email, token);
    } else if (process.env.SEND_MAIL === 'false'){
        console.log('Confirmation URL with token : ', `${process.env.BASE_URL}/api/confirmation-email?token=${token}`);
        return;
    } else {
        throw new Error ("SEND_MAIL is not defined in environment.")
    }
}

export async function registerController(req: NextRequest) {
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
        if (user && user.isVerified) {
            throw new ConflictError("Un compte existe déjà avec cet email");
        }

        if (!process.env.JWT_EMAIL_SECRET) {
            throw new Error("JWT_EMAIL_SECRET is not defined");
        }
        const secret = new TextEncoder().encode(process.env.JWT_EMAIL_SECRET);

        const hashedPassword = await hashPassword(body.password);
        const userData = { ...body, password: hashedPassword };
        delete userData.confirmPassword;

        if (user && !user.isVerified) {
            userData.id = user.id;
            await updateUser(userData);
            await generateTokenAndSendMail(userData.id, userData.email, userData.firstname, secret);
            return NextResponse.json({ message: "Succès" }, { status: 202 });
        }
        if (!user) {
            const userId = await createUser(userData);
            await generateTokenAndSendMail(userId, userData.email, userData.firstname, secret);
            return NextResponse.json({ message: "Succès" }, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
