"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { login } from "../../libs/services/auth";
import * as z from "zod";
import { loginSchema } from "@/libs/validation/authSchema";

export default function Login() {
    const [inputError, setInputError] = useState<{ email: string; password: string } | null>(null);
    const [formError, setFormError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString().trim() ?? "";
        try {
            const validationSchema = loginSchema.safeParse({ email, password });

            if (!validationSchema.success) {
                const schemaErrors = z.flattenError(validationSchema.error);
                setInputError({
                    email: schemaErrors.fieldErrors.email?.[0] ?? "",
                    password: schemaErrors.fieldErrors.password?.[0] ?? "",
                });
                return;
            }
            setInputError(null);
            const data = await login(email, password);
            setFormError("");
            // Redirection
        } catch (error: unknown) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else {
                setFormError("Erreur inconnue");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>
            <form action="" className="flex flex-col items-center w-2/3 max-w-2xl" onSubmit={handleSubmit}>
                <div className="mb-6 w-full">
                    <Label htmlFor="email" className="mb-2 text-md">
                        Email
                    </Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        className={clsx(
                            "focus-visible:ring-1 focus-visible:ring-main !text-lg",
                            inputError?.email && "ring-2 ring-destructive"
                        )}
                    />
                    <div className="error-message mt-1">{inputError?.email && inputError?.email}</div>
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="password" className="mb-2 text-md">
                        Mot de passe
                    </Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        className={clsx(
                            "focus-visible:ring-1 focus-visible:ring-main !text-lg",
                            inputError?.password && "ring-2 ring-destructive"
                        )}
                    />
                    <div className="error-message mt-1">{inputError?.password && inputError?.password}</div>
                </div>
                <div className="text-center !text-lg">
                    <Button type={"submit"}>Se connecter</Button>
                </div>
            </form>
            <div className="error-message mt-5">{formError && formError}</div>
        </div>
    );
}
