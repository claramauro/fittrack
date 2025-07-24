"use client";

import * as z from "zod";
import { RegisterField, registerSchema } from "@/libs/validation/authSchema";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { ChangeEvent, useState } from "react";
import clsx from "clsx";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [formDataErrors, setFormDataErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.currentTarget;
        setFormData((prev) => ({ ...prev, [id]: value }));
        validateFields(id as RegisterField, value);
    }

    function validateFields(id: RegisterField, value: string) {
        const validationSchema = registerSchema.shape[id];
        const validationValue = validationSchema.safeParse(value);

        if (!validationValue.success) {
            const schemaError = z.flattenError(validationValue.error);
            setFormDataErrors((prev) => ({ ...prev, [id]: schemaError.formErrors[0] }));
            return;
        }
        setFormDataErrors((prev) => ({ ...prev, [id]: "" }));

        // Gérer confirmPassword
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
                        className={clsx(
                            "focus-visible:ring-1 focus-visible:ring-main !text-lg",
                            formDataErrors?.firstname && "ring-2 ring-destructive focus-visible:ring-destructive"
                        )}
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                    <div className="error-message mt-1">{formDataErrors?.firstname && formDataErrors?.firstname}</div>
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="lastname" className="mb-2 text-md">
                        Nom
                    </Label>
                    <Input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className={clsx(
                            "focus-visible:ring-1 focus-visible:ring-main !text-lg",
                            formDataErrors?.lastname && "ring-2 ring-destructive focus-visible:ring-destructive"
                        )}
                        onChange={handleChange}
                        value={formData.lastname}
                    />
                    <div className="error-message mt-1">{formDataErrors?.lastname && formDataErrors?.lastname}</div>
                </div>
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
                            formDataErrors?.email && "ring-2 ring-destructive focus-visible:ring-destructive"
                        )}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <div className="error-message mt-1">{formDataErrors?.email && formDataErrors?.email}</div>
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
                            formDataErrors?.password && "ring-2 ring-destructive focus-visible:ring-destructive"
                        )}
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <div className="mt-1 text-gray-500 italic">
                        Doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un
                        caractère spécial.
                    </div>
                    <div className="error-message mt-1">{formDataErrors?.password && formDataErrors?.password}</div>
                </div>
                <div className="mb-6 w-full">
                    <Label htmlFor="confirmPassword" className="mb-2 text-md">
                        Confirmation du mot de passe
                    </Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={clsx(
                            "focus-visible:ring-1 focus-visible:ring-main !text-lg",
                            formDataErrors?.confirmPassword && "ring-2 ring-destructive focus-visible:ring-destructive"
                        )}
                        onChange={handleChange}
                        value={formData.confirmPassword}
                    />

                    <div className="error-message mt-1">
                        {formDataErrors?.confirmPassword && formDataErrors?.confirmPassword}
                    </div>
                </div>
                <div className="text-center !text-lg">
                    <Button type={"submit"}>S&apos;inscrire</Button>
                </div>
            </form>
        </div>
    );
}
