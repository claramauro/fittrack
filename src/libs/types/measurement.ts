export type Measurement = {
    id: string;
    userId: string;
    measuredAt: Date;
    weight: number | string | null;
    chest: number | string | null;
    underbust: number | string | null;
    waist: number | string | null;
    belly: number | string | null;
    hips: number | string | null;
    thigh: number | string | null;
    arm: number | string | null;
    createdAt: Date;
    updatedAt: Date | null;
};
