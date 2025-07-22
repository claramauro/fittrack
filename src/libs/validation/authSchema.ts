import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("L'email doit être valide"),
    password: z.string().min(1, 'Le mot de passe est requis'),
});
