"use client";

import * as z from "zod";
import { RegisterField, registerSchema } from "@/libs/validation/authSchema";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import clsx from "clsx";
import { register } from "@/libs/client/services/auth";
import { FormError } from "@/libs/client/errors/customErrors";

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

    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSucces] = useState("");

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.currentTarget;
        setFormData((prev) => ({ ...prev, [id]: value }));
        validateFields(id as RegisterField, value);
    }

    function validateFields(id: RegisterField, value: string) {
        const validationSchema = registerSchema.shape[id];
        const validationValue = validationSchema.safeParse(value);

        if (validationValue.error) {
            const schemaError = z.flattenError(validationValue.error);
            setFormDataErrors((prev) => ({ ...prev, [id]: schemaError.formErrors[0] }));
        } else {
            setFormDataErrors((prev) => ({ ...prev, [id]: "" }));
        }

        if (id === "confirmPassword" || id === "password") {
            const password = id === "password" ? value : formData.password;
            const confirmPassword = id === "confirmPassword" ? value : formData.confirmPassword;
            if (confirmPassword && password !== confirmPassword) {
                setFormDataErrors((prev) => ({ ...prev, confirmPassword: "Les mots de passe ne correspondent pas" }));
            } else {
                setFormDataErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (Object.values(formDataErrors).some((value) => value !== "")) {
            setFormError("Veuillez corriger les erreurs avant de soumettre");
            return;
        }
        try {
            const validationSchema = registerSchema.safeParse(formData);
            if (validationSchema.error) {
                const schemaErrors = z.flattenError(validationSchema.error);

                setFormDataErrors((prev) => {
                    const errors: typeof formDataErrors = { ...prev };
                    for (const [key, value] of Object.entries(schemaErrors.fieldErrors)) {
                        errors[key as RegisterField] = value ? value[0] : "";
                    }
                    return errors;
                });
                setFormError("Veuillez corriger les erreurs avant de soumettre");
                return;
            }
            setFormDataErrors({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setFormError("");
            await register(formData);
            setFormSucces(
                "Inscription confirmée ! Un e-mail de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception pour activer votre compte."
            );
        } catch (error) {
            if (error instanceof FormError) {
                setFormError(error.message);
                if (error.errors && error.errors.length > 0) {
                    setFormDataErrors((prev) => {
                        const errors: typeof formDataErrors = { ...prev };
                        error.errors?.forEach((err) => {
                            errors[err.field as RegisterField] = err.message;
                        });

                        return errors;
                    });
                } else {
                    setFormDataErrors({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" });
                }
            } else {
                setFormError("Erreur inconnue, veuillez réessayer");
            }
        }
    }

    return (
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-center mx-auto w-2/3 max-w-2xl">
            <div className="mb-6 w-full">
                <Label htmlFor="firstname" className="mb-2 text-md">
                    Prénom
                    <span>*</span>
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
                    <span>*</span>
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
                    <span>*</span>
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
                    <span>*</span>
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
                <div className="mt-1 text-gray-500 italic text-sm">
                    Au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.
                </div>
                <div className="error-message mt-1">{formDataErrors?.password && formDataErrors?.password}</div>
            </div>
            <div className="mb-6 w-full">
                <Label htmlFor="confirmPassword" className="mb-2 text-md">
                    Confirmation du mot de passe
                    <span>*</span>
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
            <div className="mr-auto text-gray-500 italic  text-sm">* champs requis</div>
            <div className="text-center !text-lg">
                <Button type={"submit"}>S&apos;inscrire</Button>
            </div>
            <div className="error-message mt-5 text-center                                                ">
                {formError && formError}
            </div>
            <div className="success-message mt-5 text-center                                                ">
                {formSuccess && formSuccess}
            </div>
        </form>
    );
}
