"use client";

import { resendConfirmationEmail } from "@/libs/client/services/auth";
import { loginSchema } from "@/libs/validation/authSchema";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, useState } from "react";

const statusList = ["success", "error", "expired"];

export default function ConfirmationEmailClient({ status }: { status?: string }) {
    const [wantNewMail, setWantNewMail] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (!status || !statusList.some((s) => s === status)) {
        notFound();
    }

    let message;
    switch (status) {
        case "success":
            message =
                "Votre email a été validé avec succès.\nVous pouvez à présent pour connecter sur votre compte FitTrack.";
            break;
        case "error":
            message = "Une erreur est survenue lors de la confirmation de l'email, veuillez réessayer.";
            break;
        case "expired":
            message = `Le lien de confirmation est expiré, votre email n'a pas pu être validé.\n\nVoulez-vous recevoir un nouveau lien ?`;
            break;
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setEmailError("");
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const validationSchema = loginSchema.pick({ email: true });
        const validationResult = validationSchema.safeParse({ email });

        if (validationResult.error) {
            setEmailError(validationResult.error.issues[0].message);
            return;
        }

        try {
            setIsLoading(true);
            const response = await resendConfirmationEmail(email as string);
            setSuccessMessage(response.message);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Une erreur est survenue, veuillez réessayer.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full p-12 gap-y-8">
            <h2 className="text-center text-2xl font-bold">
                {status === "success" ? "Inscription finalisée ✅" : "Impossible de confirmer votre email ❌"}
            </h2>
            <p className={"whitespace-pre-line"}>{message}</p>
            {status === "success" && (
                <Button asChild type="button">
                    <Link href={"/connexion"}>Me connecter</Link>
                </Button>
            )}
            {status === "error" && (
                <Button asChild type="button">
                    <Link href={"/inscription"}>S&apos;inscrire</Link>
                </Button>
            )}
            {status === "expired" && wantNewMail === false && (
                <Button onClick={() => setWantNewMail(true)} type="button">
                    Renvoyer un lien par email
                </Button>
            )}
            {wantNewMail && (
                <form className="w-full sm:w-[70%] min-[900px]:w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email : </Label>
                    <Input id="email" name="email" type="text" placeholder="Adresse e-mail " />
                    {emailError && <p className="error-message">{emailError}</p>}
                    <Button type={"submit"} disabled={isLoading}>
                        {!isLoading ? "Renvoyer un email" : <Loader2Icon className="animate-spin" />}
                    </Button>
                </form>
            )}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}
