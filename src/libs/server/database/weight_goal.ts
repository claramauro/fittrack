import { WeightGoal } from "@/libs/types/weigthGoal";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "./connection";
import { mapWeightGoalDbToWeightGoal } from "../mappers/weightGoalMapper";
import { WeightGoalDb } from "@/libs/types/db/weightGoal";

export async function getActiveGoalByUser(userId: string): Promise<WeightGoal | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM weight_goal WHERE user_id = ? and status = 'active' ORDER BY created_at ASC",
        [userId]
    );

    const goal = rows[0] as WeightGoalDb;
    if (!goal) {
        return null;
    }
    return mapWeightGoalDbToWeightGoal(goal);
}

export async function getAllActiveGoalsByUser(userId: string): Promise<WeightGoal[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM weight_goal WHERE user_id = ? and status = 'active' ORDER BY created_at ASC",
        [userId]
    );
    if (!rows.length) {
        return [];
    }
    return (rows as WeightGoalDb[]).map(mapWeightGoalDbToWeightGoal);
}

export async function archiveGoal(id: string) {
    await pool.query<ResultSetHeader>("UPDATE weight_goal SET status = 'archived' WHERE id = ?", [id]);
}

export async function createGoal(userId: string, targetWeight: number) {
    await pool.query<ResultSetHeader>("INSERT INTO weight_goal (user_id, target_weight) VALUES (?, ?);", [
        userId,
        targetWeight,
    ]);
}
