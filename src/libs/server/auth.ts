import { compare } from "bcrypt-ts";
import { JWTPayload, SignJWT } from "jose";
import { getUserByEmail } from "./database/user";
import { ValidationError } from "./errors/customErrors";

export async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new ValidationError("Email ou mot de passe invalide");
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
