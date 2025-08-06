import { compare, hash } from "bcrypt-ts";
import { getUserByEmail } from "../database/user";
import { genSalt } from "bcrypt-ts/browser";

export async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) return null;

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) return null;

    if (!user.isVerified) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function hashPassword(password: string) {
    const salt = await genSalt(10);
    return hash(password, salt);
}
