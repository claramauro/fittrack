export type MeasurementDb = {
    id: number;
    user_id: number;
    measured_at: Date;
    weight: number | null;
    chest: number | null;
    underbust: number | null;
    waist: number | null;
    belly: number | null;
    hips: number | null;
    thigh: number | null;
    arm: number | null;
    created_at: Date;
    updated_at: Date | null;
};
