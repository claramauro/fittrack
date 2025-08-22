"use server";

import {
    createMeasurement,
    getMeasurementById,
    getMeasurementByDate,
    updateMeasurement,
} from "@/libs/server/database/measurement";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { MeasurementActionState } from "@/libs/types/actionState";
import { measurementsSchema } from "@/libs/validation/measurementsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMeasurementAction(initialState: MeasurementActionState, formData: FormData) {
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
                const key = issue.path[0] as keyof MeasurementActionState["formErrors"];
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
        const existingMeasurements = await getMeasurementByDate(userId, measurementsSchemaValidation.data.measuredAt);

        if (existingMeasurements) {
            throw new ValidationError(
                "Ajout impossible :\n il existe déjà des mesures enregistrées pour cette date.\nVous devez les supprimer ou vous pouvez les modifier dans l’historique ci-dessous"
            );
        }
        await createMeasurement(userId, measurementsSchemaValidation.data);
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

export async function updateMeasurementAction(
    measurementId: string,
    initialState: MeasurementActionState,
    formData: FormData
) {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
    try {
        const measurementsData: Record<string, string | null> = {};
        for (let [key, value] of formData.entries()) {
            measurementsData[key] = value === "" ? null : String(value);
        }
        const measurementsSchemaValidation = measurementsSchema.omit({ measuredAt: true }).safeParse(measurementsData);

        if (measurementsSchemaValidation.error) {
            const errors: Record<string, string> = {};
            measurementsSchemaValidation.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof MeasurementActionState["formErrors"];
                errors[key] = issue.message;
            });
            return {
                status: "error",
                message: "Donnée(s) non valide(s), veuillez corriger et valider à nouveau",
                data: {
                    measuredAt: initialState.data.measuredAt,
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
        const existingMeasurements = await getMeasurementById(userId, measurementId);
        if (!existingMeasurements) {
            throw new Error("No measurement with this ID");
        }
        await updateMeasurement(measurementId, measurementsSchemaValidation.data);
    } catch (error) {
        console.log(error);
    }

    return {
        status: "",
        message: "",
        data: {
            measuredAt: initialState.data.measuredAt ?? "",
            chest: initialState.data.chest ?? "",
            underbust: initialState.data.underbust ?? "",
            waist: initialState.data.waist ?? "",
            belly: initialState.data.belly ?? "",
            hips: initialState.data.hips ?? "",
            thigh: initialState.data.thigh ?? "",
            arm: initialState.data.arm ?? "",
            weight: initialState.data.weight ?? "",
        },
        formErrors: null,
    };
}
