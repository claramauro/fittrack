"use server";

import {
    createMeasurement,
    getMeasurementById,
    getMeasurementByDate,
    updateMeasurement,
    deleteMeasurement,
} from "@/libs/server/database/measurement";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { ActionState, AddMeasurementActionState, UpdateMeasurementActionState } from "@/libs/types/actionState";
import { measurementsSchema } from "@/libs/validation/measurementsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMeasurementAction(
    initialState: AddMeasurementActionState,
    formData: FormData
): Promise<AddMeasurementActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
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
    try {
        const measurementsSchemaValidation = measurementsSchema.safeParse(measurementsData);
        if (measurementsSchemaValidation.error) {
            const errors: Record<string, string> = {};
            measurementsSchemaValidation.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof AddMeasurementActionState["formErrors"];
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
    }
}

export async function updateMeasurementAction(
    measurementId: string,
    initialState: UpdateMeasurementActionState,
    formData: FormData
): Promise<UpdateMeasurementActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
    const measurementsData: Record<string, string | null> = {};
    for (let [key, value] of formData.entries()) {
        measurementsData[key] = value === "" ? null : String(value);
    }
    try {
        const measurementsSchemaValidation = measurementsSchema.omit({ measuredAt: true }).safeParse(measurementsData);

        if (measurementsSchemaValidation.error) {
            const errors: Record<string, string> = {};
            measurementsSchemaValidation.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof UpdateMeasurementActionState["formErrors"];
                errors[key] = issue.message;
            });
            return {
                status: "error",
                message: "Donnée(s) non valide(s), veuillez corriger et valider à nouveau",
                data: {
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
        revalidatePath("/mesures");
        return {
            status: "success",
            message: "Mesures modifiées",
            data: {
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
            message: "Une erreur est survenue, veuillez réessayer.",
            data: {
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
    }
}

export async function deleteMeasurementAction(
    measurementId: string,
    _initialState: ActionState,
    _formData: FormData
): Promise<ActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
    try {
        const measurementToDelete = await getMeasurementById(userId, measurementId);
        if (!measurementToDelete) {
            throw Error("No measurement with this ID");
        }
        await deleteMeasurement(measurementId);
        return {
            status: "success",
            message: "Mesures supprimées",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Une erreur est survenue, veuillez réessayer.",
        };
    }
}
