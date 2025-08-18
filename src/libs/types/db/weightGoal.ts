import { GoalStatus } from "../weigthGoal";

export type WeightGoalDb = {
    id: number;
    user_id: number;
    target_weight: number | string;
    status: GoalStatus;
    created_at: Date;
    updated_at: Date | null;
};
