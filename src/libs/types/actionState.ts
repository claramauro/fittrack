export type MeasurementActionState = {
    status: string;
    message: string;
    data: {
        measuredAt: string;
        weight: string;
        chest: string;
        underbust: string;
        waist: string;
        belly: string;
        hips: string;
        thigh: string;
        arm: string;
    };
    formErrors: null | {
        measuredAt?: string;
        weight?: string;
        chest?: string;
        underbust?: string;
        waist?: string;
        belly?: string;
        hips?: string;
        thigh?: string;
        arm?: string;
    };
};

export type WeightGoalActionState = { status: string; message: string };
