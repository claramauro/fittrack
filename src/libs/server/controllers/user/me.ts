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
        const { payload } = await checkToken(token);
        if (!payload) {
            throw new Error("Token invalide");
        }
        const user = await getUserByEmail(payload.email as string);
        // return NextResponse.json({
        //     email: payload.email,
        //     firstname: payload.firstname,
        //     lastname: payload.lastname,
        //     id: payload,
        // });
    } catch (error) {
        return errorHandler(error);
    }
}
