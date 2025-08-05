import { NextRequest, NextResponse } from "next/server";
import { privatePaths } from "./libs/constants/privatePaths";
import { checkToken } from "./libs/server/services/auth";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token");
    const pathname = request.nextUrl.pathname;
    const isPrivateRoute = privatePaths.some((path) => path === pathname);

    if (!token) {
        if (isPrivateRoute) {
            return NextResponse.redirect(new URL("/connexion", request.url));
        }
        return NextResponse.next();
    }

    try {
        await checkToken(token.value);
    } catch {
        const response = NextResponse.redirect(new URL("/connexion", request.url));
        response.cookies.delete("auth_token");
        return response;
    }

    if (pathname === "/connexion") {
        // Utilisateur authentifié avec token valide -> redirection sur dashboard
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|/images/|/icons/).*)"],
};
