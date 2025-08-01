"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { login } from "../../../libs/client/services/auth";
import * as z from "zod";
import { LoginField, loginSchema } from "@/libs/validation/authSchema";
import { useRouter } from "next/navigation";
import { FormError } from "@/libs/client/errors/customErrors";
import { Loader2Icon } from "lucide-react";

export default function LoginForm() {
    const [inputErrors, setInputErrors] = useState<{ email: string; password: string }>({ email: "", password: "" });
    const [formError, setFormError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString().trim() ?? "";
        try {
            const validationResult = loginSchema.safeParse({ email, password });

            if (validationResult.error) {
                const schemaErrors = z.flattenError(validationResult.error);
                setInputErrors({
                    email: schemaErrors.fieldErrors.email?.[0] ?? "",
                    password: schemaErrors.fieldErrors.password?.[0] ?? "",
                });
                return;
            }
            setInputErrors({ email: "", password: "" });
            setIsLoading(true);
            await login(email, password);
            setFormError("");
            router.push("/");
            setIsLoading(false);
        } catch (error: unknown) {
            if (error instanceof FormError) {
                setFormError(error.message);
                if (error.errors && error.errors.length > 0) {
                    setInputErrors((prev) => {
                        const errors: typeof inputErrors = { ...prev };
                        error.errors?.forEach((err) => {
                            errors[err.field as LoginField] = err.message;
                        });

                        return errors;
                    });
                } else {
                    setInputErrors({ email: "", password: "" });
                }
            } else {
                setFormError("Erreur inconnue, veuillez réessayer");
            }
            setIsLoading(false);
        }
    }

    return (
        <form action="" className="flex flex-col items-center mx-auto w-2/3 max-w-2xl" onSubmit={handleSubmit}>
            <div className="mb-6 w-full">
                <Label htmlFor="email" className="mb-2 text-md">
                    Email
                </Label>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Adresse e-mail"
                    className={clsx(
                        "focus-visible:ring-1 focus-visible:ring-main",
                        inputErrors?.email && "ring-2 ring-destructive"
                    )}
                />
                <div className="error-message mt-1">{inputErrors?.email && inputErrors?.email}</div>
            </div>
            <div className="mb-6 w-full">
                <Label htmlFor="password" className="mb-2 text-md">
                    Mot de passe
                </Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                    className={clsx(
                        "focus-visible:ring-1 focus-visible:ring-main",
                        inputErrors?.password && "ring-2 ring-destructive"
                    )}
                />
                <div className="error-message mt-1">{inputErrors?.password && inputErrors?.password}</div>
            </div>
            <div className="text-center !text-lg">
                <Button type={"submit"} disabled={isLoading}>
                    {!isLoading ? "Se connecter" : <Loader2Icon className="animate-spin" />}
                </Button>
            </div>
            <div className="error-message mt-5 text-center">{formError && formError}</div>
        </form>
    );
}
