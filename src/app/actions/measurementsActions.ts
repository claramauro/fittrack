"use server";

import { createMeasurements } from "@/libs/server/database/measurement";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { measurementsSchema } from "@/libs/validation/measurementsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = {
    status: string;
    message: string;
    data: {
        measuredAt: string;
        weight: string;
        chest: string;
        underbust: string;
        waist: string;
        belly: string;
        hips: string;
        thigh: string;
        arm: string;
    };
    formErrors?: null | {
        measuredAt?: string;
        weight?: string;
        chest?: string;
        underbust?: string;
        waist?: string;
        belly?: string;
        hips?: string;
        thigh?: string;
        arm?: string;
    };
};

export async function createMeasurementsAction(initialState: ActionState, formData: FormData) {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
    try {
        const allowedKeys = ["measuredAt", "chest", "underbust", "waist", "belly", "hips", "thigh", "arm", "weight"];
        const measurementsData: Record<string, string | null> = {};
        for (let [key, value] of formData.entries()) {
            if (!allowedKeys.includes(key)) continue;
            if (key === "measuredAt") {
                measurementsData[key] = String(value);
            } else {
                measurementsData[key] = value === "" ? null : String(value);
            }
        }
        const measurementsSchemaValidation = measurementsSchema.safeParse(measurementsData);
        if (measurementsSchemaValidation.error) {
            const errors: Record<string, string> = {};
            measurementsSchemaValidation.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof ActionState["formErrors"];
                errors[key] = issue.message;
            });
            return {
                status: "error",
                message: "Donnée(s) non valide(s), veuillez corriger et valider à nouveau",
                data: {
                    measuredAt: measurementsData.measuredAt ?? "",
                    chest: measurementsData.chest ?? "",
                    underbust: measurementsData.underbust ?? "",
                    waist: measurementsData.waist ?? "",
                    belly: measurementsData.belly ?? "",
                    hips: measurementsData.hips ?? "",
                    thigh: measurementsData.thigh ?? "",
                    arm: measurementsData.arm ?? "",
                    weight: measurementsData.weight ?? "",
                },
                formErrors: errors,
            };
        }
        await createMeasurements(userId, measurementsSchemaValidation.data);
        revalidatePath("/mesures");
        return {
            status: "success",
            message: "Mesures ajoutées",
            data: {
                measuredAt: measurementsData.measuredAt ?? "",
                chest: measurementsData.chest ?? "",
                underbust: measurementsData.underbust ?? "",
                waist: measurementsData.waist ?? "",
                belly: measurementsData.belly ?? "",
                hips: measurementsData.hips ?? "",
                thigh: measurementsData.thigh ?? "",
                arm: measurementsData.arm ?? "",
                weight: measurementsData.weight ?? "",
            },
            formErrors: null,
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: error instanceof ValidationError ? error.message : "Une erreur est survenue, veuillez réessayer.",
            data: initialState.data,
            formErrors: null,
        };
    }
}
