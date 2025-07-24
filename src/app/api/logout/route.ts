import { NextResponse } from "next/server";

export function POST() {
    const response = NextResponse.json({ message: "Succès" }, { status: 200 });
    response.cookies.set({
        name: "auth_token",
        value: "",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
    });
    return response;
}
