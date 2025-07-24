import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Le format de l'email n'est pas valide"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterField = keyof RegisterSchema;

export const registerSchema = z
    .object({
        firstname: z.string().min(1, "Le prénom ne peut être vide"),
        lastname: z.string().min(1, "Le nom ne peut être vide"),
        email: z.email("Le format de l'email n'est pas valide"),
        password: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
                "Le mot de passe n'est pas valide"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });
