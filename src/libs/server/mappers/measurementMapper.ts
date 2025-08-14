import { MeasurementDb } from "@/libs/types/db/measurement";
import { Measurement } from "@/libs/types/measurement";

export function mapMeasurementDbToMeasurement(measurementDb: MeasurementDb): Measurement {
    return {
        id: measurementDb.id.toString(),
        userId: measurementDb.user_id.toString(),
        measuredAt: measurementDb.measured_at,
        weight: measurementDb.weight,
        chest: measurementDb.chest,
        underbust: measurementDb.underbust,
        waist: measurementDb.waist,
        belly: measurementDb.belly,
        hips: measurementDb.hips,
        thigh: measurementDb.thigh,
        arm: measurementDb.arm,
        createdAt: measurementDb.created_at,
        updatedAt: measurementDb.updated_at,
    };
}
