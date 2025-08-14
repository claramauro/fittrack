"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [formError, setFormError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString().trim() ?? "";
        const password = formData.get("password")?.toString().trim() ?? "";
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            console.log(response);

            if (response?.error) {
                setIsLoading(false);
                if (response.error === "CredentialsSignin") {
                    setFormError("Identifiants invalides");
                } else {
                    setFormError("Erreur interne, veuillez réessayer");
                }
            } else {
                setFormError("");
                router.push("/");
            }
        } catch {
            setIsLoading(false);
            setFormError("Erreur interne, veuillez réessayer");
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
                    className="focus-visible:ring-1 focus-visible:ring-main"
                />
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
                    className="focus-visible:ring-1 focus-visible:ring-main"
                />
            </div>
            <div className="text-center !text-lg">
                <Button type="submit" disabled={isLoading}>
                    {!isLoading ? "Se connecter" : <Loader2Icon className="animate-spin" />}
                </Button>
            </div>
            <div className="error-message mt-5 text-center">{formError && formError}</div>
        </form>
    );
}
