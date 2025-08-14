"use server";

import { archiveGoal, createGoal, getAllActiveGoalsByUser } from "@/libs/server/database/weight_goal";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { targetWeightSchema } from "@/libs/validation/weightGoal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = { status: string; message: string };

export async function createWeightGoal(initialState: ActionState, formData: FormData): Promise<ActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;

    const targetWeight = Number(formData.get("targetWeight"));

    const targetWeightValidation = targetWeightSchema.safeParse({ targetWeight });

    if (targetWeightValidation.error) {
        return { status: "error", message: targetWeightValidation.error.issues[0].message };
    }

    const activeGoals = await getAllActiveGoalsByUser(userId);
    if (activeGoals.length > 0) {
        await Promise.all(activeGoals.map((goal) => archiveGoal(goal.id)));
    }
    await createGoal(userId, targetWeight);
    revalidatePath("/");
    redirect("/");
}
