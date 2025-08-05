import { RowDataPacket } from "mysql2";
import { mapMeasurementDbToMeasurement } from "../mappers/measurementMapper";
import { pool } from "./connection";
import { MeasurementDb } from "@/libs/types/db/measurement";

export async function getMeasurementsByUser(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM measurement WHERE user_id = ?", [id]);
    return (rows as MeasurementDb[]).map(mapMeasurementDbToMeasurement);
}
