"use server";

import {
    archiveWeightGoal,
    createWeightGoal,
    getAllActiveGoalsByUser,
    getGoalById,
    updateWeightGoal,
} from "@/libs/server/database/weight_goal";
import { ValidationError } from "@/libs/server/errors/customErrors";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { ActionState } from "@/libs/types/actionState";
import { targetWeightSchema } from "@/libs/validation/weightGoalSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWeightGoalAction(
    _initialState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id;
    try {
        const targetWeight = Number(formData.get("targetWeight"));
        const targetWeightValidation = targetWeightSchema.safeParse({ targetWeight });
        if (targetWeightValidation.error) {
            throw new ValidationError(targetWeightValidation.error.issues[0].message);
        }

        const activeGoals = await getAllActiveGoalsByUser(userId);
        if (activeGoals.length > 0) {
            await Promise.all(activeGoals.map((goal) => archiveWeightGoal(goal.id)));
        }
        await createWeightGoal(userId, targetWeight);
        revalidatePath("/");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {
            status: "error",
            message: error instanceof ValidationError ? error.message : "Une erreur est survenue, veuillez réessayer.",
        };
    }
    redirect("/");
}

export async function updateWeightGoalAction(
    weightGoalId: string | undefined,
    _initialState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id.toString();
    try {
        if (!weightGoalId) {
            throw new Error("weightGoalId is missing");
        }

        const targetWeight = Number(formData.get("targetWeight"));
        const targetWeightValidation = targetWeightSchema.safeParse({ targetWeight });

        if (targetWeightValidation.error) {
            throw new ValidationError(targetWeightValidation.error.issues[0].message);
        }

        const weightGoalToUpdate = await getGoalById(weightGoalId);
        if (!weightGoalToUpdate) {
            throw new Error("No goals with this ID");
        }
        if (weightGoalToUpdate.userId !== userId) {
            console.error("Unauthorized: The goal does not belong to this user");
            throw new Error("Unauthorized: The goal does not belong to this user");
        }
        await updateWeightGoal(weightGoalId, targetWeight);
        revalidatePath("/");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {
            status: "error",
            message: error instanceof ValidationError ? error.message : "Une erreur est survenue, veuillez réessayer.",
        };
    }
    redirect("/");
}
export async function archiveWeightGoalAction(
    weightGoalId: string | undefined,
    _initialState: ActionState,
    _formData: FormData
): Promise<ActionState> {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const userId = session.user.id.toString();
    try {
        if (!weightGoalId) {
            throw new Error("weightGoalId is missing");
        }
        const weightGoalToArchive = await getGoalById(weightGoalId);
        if (!weightGoalToArchive) {
            throw new Error("No goals with this ID");
        }
        if (weightGoalToArchive.userId !== userId) {
            console.error("Unauthorized: The goal does not belong to this user");
            throw new Error("Unauthorized: The goal does not belong to this user");
        }
        await archiveWeightGoal(weightGoalId);
        revalidatePath("/");
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {
            status: "error",
            message: error instanceof ValidationError ? error.message : "Une erreur est survenue, veuillez réessayer.",
        };
    }
    redirect("/");
}
