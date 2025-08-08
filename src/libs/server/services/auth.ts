import { compare, hash } from "bcrypt-ts";
import { getUserByEmail } from "../database/user";
import { genSalt } from "bcrypt-ts/browser";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { JWTExpired } from "jose/errors";
import { AuthorizationError } from "../errors/customErrors";

export async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) return null;

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return null;

    if (!user.isVerified) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
}

export async function generateToken(
    payload: JWTPayload,
    exp: string,
    secret: Uint8Array<ArrayBufferLike>
): Promise<string> {
    const alg = "HS256";
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(secret);

    return jwt;
}

export async function verifyAndDecodeToken(token: string, secret: Uint8Array<ArrayBufferLike>): Promise<JWTPayload> {
    try {
        const { payload } = await jwtVerify(token, secret);
        if (!payload) {
            throw new AuthorizationError("Token invalide", 401);
        }
        return payload;
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof JWTExpired && error.code === "ERR_JWT_EXPIRED") {
            throw new AuthorizationError("Token expiré", 401);
        }
        throw new Error(error instanceof Error ? error.message : "Erreur interne, veuillez réessayer.");
    }
}
