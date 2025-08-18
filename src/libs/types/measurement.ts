export type Measurement = {
    id: string;
    userId: string;
    measuredAt: Date;
    weight: number | null;
    chest: number | null;
    underbust: number | null;
    waist: number | null;
    belly: number | null;
    hips: number | null;
    thigh: number | null;
    arm: number | null;
    createdAt: Date;
    updatedAt: Date | null;
};
