"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { useEffect } from "react";
import { login } from "../../libs/services/auth";

export default function Login() {
    useEffect(() => {
        login({ email: "clara.mauro@hotmail.fr", password: "1234" });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>
            <form action="" className="flex flex-col items-center w-2/3 max-w-2xl">
                <div className="mb-6 w-full">
                    <Label htmlFor="email" className="mb-2 text-md">
                        Email
                    </Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        className="focus-visible:ring-1 focus-visible:ring-main !text-lg"
                    />
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="password" className="mb-2 text-md">
                        Mot de passe
                    </Label>
                    <Input type="password" className="focus-visible:ring-1 focus-visible:ring-main !text-lg" />
                </div>
                <div className="text-center !text-lg">
                    <Button>Se connecter</Button>
                </div>
            </form>
        </div>
    );
}
