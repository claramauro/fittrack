import { compare, genSalt, hash } from "bcrypt-ts";
import { getUserByEmail } from "./database/user/queries";
import { ValidationError } from "./errors/customErrors";

export async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new ValidationError("Email ou mot de passe invalide");
    }
    const passwordMatch = compare(password, user.password);
    if (!passwordMatch) {
        throw new ValidationError("Email ou mot de passe invalide");
    }
    return user;
}
