"use server";

import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { targetWeightSchema } from "@/libs/validation/weightGoal";

export async function createWeightGoal(formData: FormData) {
    const session = await getServerAuthSession();
    if (!session || !session.user) throw new Error("Non authentifié");
    const userId = session.user.id;

    const targetWeight = Number(formData.get("targetWeight"));

    const targetWeightValidation = targetWeightSchema.safeParse({ targetWeight });
    console.log(targetWeightValidation);
}
