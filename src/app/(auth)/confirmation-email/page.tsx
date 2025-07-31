"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const statusList = ["success", "error", "expired"];

export default function ConfirmationEmail() {
    const [wantNewMail, setWantNewMail] = useState(false);

    const params = useSearchParams();
    const status = params.get("status");

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
            message = `Le lien de confirmation est expiré, votre email n'a pas pu être validé.\nVoulez-vous recevoir un nouveau lien ?`;
            break;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        // Utiliser schema login
        // Voir pour renvoyer sur /api/register?resend=true
    }

    return (
        <div className="flex flex-col items-center justify-center h-full px-12 gap-y-8">
            <h2 className="text-center text-2xl font-bold">
                {status === "success" ? "Inscription finalisée ✅" : "Impossible de confirmer votre email ❌"}
            </h2>
            <p className={"whitespace-pre-line"}>{message}</p>
            {status === "success" && (
                <Button asChild type="button">
                    <Link href={"/login"}>Me connecter</Link>
                </Button>
            )}
            {status === "expired" && wantNewMail === false && (
                <Button onClick={() => setWantNewMail(true)} type="button">
                    Renvoyer un lien par email
                </Button>
            )}
            {wantNewMail && (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email : </Label>
                    <Input id="email" name="email" type="text" placeholder="Adresse e-mail " />
                    <Button type="submit">Renvoyer un email</Button>
                </form>
            )}
        </div>
    );
}
