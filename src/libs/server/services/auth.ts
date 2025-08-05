import { compare, hash } from "bcrypt-ts";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { getUserByEmail } from "../database/user";
import { AuthorizationError, ValidationError } from "../errors/customErrors";
import { genSalt } from "bcrypt-ts/browser";
import { NextRequest } from "next/server";
import { JWTExpired } from "jose/errors";

export async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new ValidationError("Email ou mot de passe invalide");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
        throw new ValidationError("Email ou mot de passe invalide");
    }

    if (!user.isVerified) {
        throw new AuthorizationError(
            "Votre compte n’est pas encore activé. Veuillez vérifier votre adresse email pour finaliser votre inscription"
        );
    }
    return user;
}

export async function generateToken(payload: JWTPayload, exp: string): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secret);

    return jwt;
}

export async function checkToken(token: string): Promise<boolean> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        await jwtVerify(token, secret);
        return true;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof JWTExpired && error.code === "ERR_JWT_EXPIRED") {
            throw new AuthorizationError("Token expiré", 401);
        }
        throw new Error(error instanceof Error ? error.message : "Erreur interne, veuillez réessayer.");
    }
}

export async function getPayloadFromCookie(req: NextRequest): Promise<JWTPayload> {
    const authCookie = req.cookies.get("auth_token");
    if (!authCookie) {
        throw new AuthorizationError("Non authentifié", 401);
    }
    const token = authCookie.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const { payload } = await jwtVerify(token, secret);
    if (!payload) {
        throw new Error("Token invalide");
    }
    return payload;
}

export async function getPayloadFromToken(token: string): Promise<JWTPayload> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    const { payload } = await jwtVerify(token, secret);
    if (!payload) {
        throw new Error("Token invalide");
    }
    return payload;
}

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
}
