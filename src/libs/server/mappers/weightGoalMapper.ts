import { WeightGoalDb } from "@/libs/types/db/weightGoal";
import { WeightGoal } from "@/libs/types/weigthGoal";

export function mapWeightGoalDbToWeightGoal(weightGoalDb: WeightGoalDb): WeightGoal {
    return {
        id: weightGoalDb.id,
        userId: weightGoalDb.user_id,
        targetWeight: weightGoalDb.target_weight,
        status: weightGoalDb.status,
        createdAt: weightGoalDb.created_at,
        updatedAt: weightGoalDb.updated_at,
    };
}
