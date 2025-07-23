import { NextRequest, NextResponse } from "next/server";
import { privatePaths } from "./libs/constants/privatePaths";
import { checkToken } from "./libs/server/auth";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token");
    const pathname = request.nextUrl.pathname;
    const isPrivateRoute = privatePaths.some((path) => path === pathname);

    if (!token) {
        if (isPrivateRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }

    const isValidToken = await checkToken(token.value);

    if (!isValidToken) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth_token");
        return response;
    }

    if (pathname === "/login") {
        // Utilisateur authentifié avec token valide -> redirection sur dashboard
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|/images/|/icons/).*)"],
};
