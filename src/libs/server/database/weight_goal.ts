import { WeightGoal } from "@/libs/types/weigthGoal";
import { RowDataPacket } from "mysql2";
import { pool } from "./connection";
import { mapWeightGoalDbToWeightGoal } from "../mappers/weightGoalMapper";
import { WeightGoalDb } from "@/libs/types/db/weightGoal";

export async function getActiveGoalByUser(userId: string): Promise<WeightGoal | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM weight_goal WHERE user_id = ? and status = 'active' ORDER BY created_at ASC",
        [userId]
    );
    console.log(rows);

    const goal = rows[0] as WeightGoalDb;
    if (!goal) {
        return null;
    }
    return mapWeightGoalDbToWeightGoal(goal);
}

export async function createGoal(userId: string, targetWeight: string) {
    // Vérifier user ?
    // Vérifier si deja valeurs archivée

    const response = await pool.query("INSERT INTO weight_goal (user_id, target_weight) VALUES (?, ?);", [
        userId,
        targetWeight,
    ]);
    console.log(response);
}
