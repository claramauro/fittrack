export type MeasurementDb = {
    id: number;
    user_id: number;
    measured_at: Date;
    weight: number | string | null;
    chest: number | string | null;
    underbust: number | string | null;
    waist: number | string | null;
    belly: number | string | null;
    hips: number | string | null;
    thigh: number | string | null;
    arm: number | string | null;
    created_at: Date;
    updated_at: Date | null;
};
