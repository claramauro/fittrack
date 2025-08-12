export enum GoalStatus {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
}
export type WeightGoal = {
    id: number;
    userId: number;
    targetWeight: number | string;
    status: GoalStatus;
    createdAt: Date;
    updatedAt: Date | null;
};
