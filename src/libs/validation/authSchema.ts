import * as z from "zod";

type LoginSchema = z.infer<typeof loginSchema>;
export type LoginField = keyof LoginSchema;

export const loginSchema = z.strictObject({
    email: z.email("Le format de l'email n'est pas valide").min(1, "L'email est requis"),
    password: z.string().min(1, "Le mot de passe est requis"),
});

type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterField = keyof RegisterSchema;

export const registerSchema = z
    .strictObject({
        firstname: z.string().min(1, "Le prénom ne peut être vide"),
        lastname: z.string().min(1, "Le nom ne peut être vide"),
        email: z.email("Le format de l'email n'est pas valide").min(1, "L'email est requis"),
        password: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/,
                "Le mot de passe n'est pas valide"
            ),
        confirmPassword: z.string().min(1, "La confirmation du mot de passe est requis"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });
