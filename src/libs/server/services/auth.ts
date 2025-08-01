import { compare, hash } from "bcrypt-ts";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { getUserByEmail } from "../database/user";
import { AuthorizationError, ValidationError } from "../errors/customErrors";
import { genSalt } from "bcrypt-ts/browser";

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

export async function checkToken(token: string): Promise<JWTPayload> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error: any) {
        console.log(error);
        if (error.code === "ERR_JWT_EXPIRED") {
            throw new AuthorizationError("Token expiré", 401);
        }
        throw new Error(error.message);
    }
}

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
}
