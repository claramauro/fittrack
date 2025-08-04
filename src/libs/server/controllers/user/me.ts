import { NextRequest, NextResponse } from "next/server";
import { checkToken } from "../../services/auth";
import { AuthorizationError } from "../../errors/customErrors";
import { errorHandler } from "../../errors/errorHandler";
import { getUserByEmail } from "../../database/user";

export async function me(req: NextRequest) {
    try {
        const token = req.cookies.get("auth_token")?.value;
        if (!token) {
            throw new AuthorizationError("Non authentifié", 401);
        }
        const payload = await checkToken(token);
        if (!payload) {
            throw new Error("Token invalide");
        }
        const user = await getUserByEmail(payload.email as string);
        if (!user) {
            throw new AuthorizationError("Non authentifié", 401);
        }
        return NextResponse.json({
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        });
    } catch (error) {
        return errorHandler(error);
    }
}
