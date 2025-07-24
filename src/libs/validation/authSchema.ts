import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Le format de l'email n'est pas valide"),
    password: z.string().min(1, "Le mot de passe est requis"),
});
