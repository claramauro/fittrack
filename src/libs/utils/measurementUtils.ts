import { Measurement } from "../types/measurement";

export function getLatestWeight(measurements: Measurement[]) {
    for (let i = 0; i < measurements.length; i++) {
        const weight = measurements[i]?.weight;
        if (weight !== null && weight !== undefined) {
            return weight;
        }
    }
    return null;
}

export function getWeightDifference(currentWeight: number | null, weightTarget: number | null): number | null {
    if (currentWeight === null || weightTarget === null) {
        return null;
    }
    const difference = currentWeight - weightTarget;
    return Number(difference.toFixed(2));
}
