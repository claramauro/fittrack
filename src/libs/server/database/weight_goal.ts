import { WeightGoal } from "@/libs/types/weigthGoal";
import { RowDataPacket } from "mysql2";
import { pool } from "./connection";
import { mapWeightGoalDbToWeightGoal } from "../mappers/weightGoalMapper";
import { WeightGoalDb } from "@/libs/types/db/weightGoal";

export async function getActiveGoalByUser(id: string): Promise<WeightGoal | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM weight_goal WHERE user_id = ? and status = 'active' ORDER BY created_at DESC",
        [id]
    );
    const goal = rows[0] as WeightGoalDb;
    if (!goal) {
        return null;
    }
    return mapWeightGoalDbToWeightGoal(goal);
}
