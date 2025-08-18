import { MeasurementDb } from "@/libs/types/db/measurement";
import { Measurement } from "@/libs/types/measurement";

export function mapMeasurementDbToMeasurement(measurementDb: MeasurementDb): Measurement {
    return {
        id: measurementDb.id.toString(),
        userId: measurementDb.user_id.toString(),
        measuredAt: measurementDb.measured_at,
        weight: measurementDb.weight != null ? Number(measurementDb.weight) : null,
        chest: measurementDb.chest != null ? Number(measurementDb.chest) : null,
        underbust: measurementDb.underbust != null ? Number(measurementDb.underbust) : null,
        waist: measurementDb.waist != null ? Number(measurementDb.waist) : null,
        belly: measurementDb.belly != null ? Number(measurementDb.belly) : null,
        hips: measurementDb.hips != null ? Number(measurementDb.hips) : null,
        thigh: measurementDb.thigh != null ? Number(measurementDb.thigh) : null,
        arm: measurementDb.arm != null ? Number(measurementDb.arm) : null,
        createdAt: measurementDb.created_at,
        updatedAt: measurementDb.updated_at,
    };
}
