"use server";

import { measurementsSchema } from "@/libs/validation/measurementsSchema";

type ActionState = { status: string; message: string };

export async function createMeasurements(_initialState: ActionState, formData: FormData) {
    // revoir la conversion en objet
    const measurementsData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
    );

    const measurementsSchemaValidation = measurementsSchema.safeParse(measurementsData);
    console.log(measurementsData);

    return { status: "ok", message: "" };
}
