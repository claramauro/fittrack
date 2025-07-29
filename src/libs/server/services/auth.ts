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
    if (!user.isVerified) {
        throw new AuthorizationError(
            "Votre compte n’est pas encore activé. Veuillez vérifier votre adresse email pour finaliser votre inscription"
        );
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
        throw new ValidationError("Email ou mot de passe invalide");
    }
    return user;
}

export async function generateToken(payload: JWTPayload): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);

    return jwt;
}

export async function checkToken(token: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    try {
        await jwtVerify(token, secret);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
}
