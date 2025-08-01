import { getUserByEmail, verifyUser } from "@/libs/server/database/user";
import { AuthorizationError, ValidationError } from "@/libs/server/errors/customErrors";
import { checkToken } from "@/libs/server/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.nextUrl.searchParams.get("token");

        if (!token) {
            throw new ValidationError("Token manquant dans l'URL");
        }

        const payload = await checkToken(token);
        if (payload.type !== "email_confirmation") {
            throw new ValidationError("Token invalide");
        }

        const user = await getUserByEmail(payload.email as string);

        if (!user || Number(user.id) !== Number(payload.id)) {
            throw new ValidationError("Token invalide");
        }
        await verifyUser(Number(user.id));
        return NextResponse.redirect(new URL("/confirmation-email?status=success", req.nextUrl.origin));
    } catch (error) {
        console.log(error);
        let status = "error";
        if (error instanceof AuthorizationError) {
            status = "expired";
        }
        return NextResponse.redirect(new URL(`/confirmation-email?status=${status}`, req.nextUrl.origin));
    }
}
