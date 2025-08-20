import { RowDataPacket } from "mysql2";
import { mapMeasurementDbToMeasurement } from "../mappers/measurementMapper";
import { pool } from "./connection";
import { MeasurementDb } from "@/libs/types/db/measurement";
import { Measurement } from "@/libs/types/measurement";

/**
 *
 * @param { string } id - User Id
 * @returns {Promise<Measurement[]>} trié par date de mesure du plus récent au plus ancien
 */
export async function getMeasurementsByUser(userId: string): Promise<Measurement[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM measurement WHERE user_id = ? ORDER BY measured_at DESC",
        [userId]
    );
    return (rows as MeasurementDb[]).map(mapMeasurementDbToMeasurement);
}
