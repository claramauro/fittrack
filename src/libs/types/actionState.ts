export type ActionState = { status: string; message: string };

export interface AddMeasurementActionState extends ActionState {
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
}

export type UpdateMeasurementActionState = Omit<AddMeasurementActionState, "data"> & {
    data: Omit<AddMeasurementActionState["data"], "measuredAt">;
};

export interface WeightGoalActionState extends ActionState {
    formError: null | string;
}
