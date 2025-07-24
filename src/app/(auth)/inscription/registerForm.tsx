"use client";

import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { ChangeEvent, useState } from "react";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.currentTarget;
        console.log(id, value);
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    return (
        <div className="w-full">
            <h2 className="mb-6 text-center text-2xl font-bold">Inscription</h2>
            <form action="" className="flex flex-col items-center mx-auto w-2/3 max-w-2xl">
                <div className="mb-6 w-full">
                    <Label htmlFor="firstname" className="mb-2 text-md">
                        Prénom
                    </Label>
                    <Input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className={"focus-visible:ring-1 focus-visible:ring-main !text-lg"}
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="lastname" className="mb-2 text-md">
                        Nom
                    </Label>
                    <Input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className={"focus-visible:ring-1 focus-visible:ring-main !text-lg"}
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="email" className="mb-2 text-md">
                        Email
                    </Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        className={"focus-visible:ring-1 focus-visible:ring-main !text-lg"}
                        onChange={handleChange}
                        value={formData.email}
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
                        className={"focus-visible:ring-1 focus-visible:ring-main !text-lg"}
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="confirmPassword" className="mb-2 text-md">
                        Confirmation du mot de passe
                    </Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={"focus-visible:ring-1 focus-visible:ring-main !text-lg"}
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />
                </div>
                <div className="text-center !text-lg">
                    <Button type={"submit"}>S&apos;inscrire</Button>
                </div>
            </form>
        </div>
    );
}
