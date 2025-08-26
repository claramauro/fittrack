import { ResultSetHeader, RowDataPacket } from "mysql2";
import { mapMeasurementDbToMeasurement } from "../mappers/measurementMapper";
import { pool } from "./connection";
import { MeasurementDb } from "@/libs/types/db/measurement";
import { Measurement } from "@/libs/types/measurement";
import moment from "moment";

/**
 *
 * @param { string } id - User Id
 * @returns {Promise<Measurement[]>} trié par date de mesure du plus récent au plus ancien
 */
export async function getMeasurementsByUser(userId: string): Promise<Measurement[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM measurement WHERE user_id = ? ORDER BY measured_at DESC, id DESC",
        [userId]
    );
    return (rows as MeasurementDb[]).map(mapMeasurementDbToMeasurement);
}

export async function getMeasurementByDate(userId: string, date: Date): Promise<null | Measurement> {
    const measuredAtString = date.toISOString().slice(0, 19).replace("T", " ");
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM measurement WHERE user_id = ? AND measured_at = ?",
        [userId, measuredAtString]
    );
    const measurement = rows[0] as MeasurementDb;
    if (!measurement) {
        return null;
    }
    return mapMeasurementDbToMeasurement(measurement);
}

export async function getMeasurementById(userId: string, measurementId: string): Promise<null | Measurement> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM measurement WHERE user_id = ? AND id = ?", [
        userId,
        measurementId,
    ]);
    const measurement = rows[0] as MeasurementDb;
    if (!measurement) {
        return null;
    }
    return mapMeasurementDbToMeasurement(measurement);
}

export async function createMeasurement(
    userId: string,
    data: {
        measuredAt: Date;
        weight: number | null;
        chest: number | null;
        underbust: number | null;
        waist: number | null;
        belly: number | null;
        hips: number | null;
        thigh: number | null;
        arm: number | null;
    }
) {
    const measuredAtString = moment(data.measuredAt).format("YYYY-MM-DD");
    console.log("bdd", measuredAtString);

    await pool.query<ResultSetHeader>(
        "INSERT INTO measurement (user_id, measured_at, weight, chest, underbust, waist, belly, hips, thigh, arm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
            userId,
            measuredAtString,
            data.weight,
            data.chest,
            data.underbust,
            data.waist,
            data.belly,
            data.hips,
            data.thigh,
            data.arm,
        ]
    );
}

export async function updateMeasurement(
    measurementId: string,
    data: {
        weight: number | null;
        chest: number | null;
        underbust: number | null;
        waist: number | null;
        belly: number | null;
        hips: number | null;
        thigh: number | null;
        arm: number | null;
    }
) {
    await pool.query<ResultSetHeader>(
        "UPDATE measurement SET weight = ?, chest = ?, underbust = ?, waist = ?, belly = ?, hips = ?, thigh = ?, arm = ? WHERE id = ?",
        [
            data.weight,
            data.chest,
            data.underbust,
            data.waist,
            data.belly,
            data.hips,
            data.thigh,
            data.arm,
            measurementId,
        ]
    );
}

export async function deleteMeasurement(measurementId: string) {
    await pool.query<ResultSetHeader>("DELETE FROM measurement WHERE id = ?", [measurementId]);
}
