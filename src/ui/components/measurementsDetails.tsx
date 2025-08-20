import { Measurement } from "@/libs/types/measurement";
import clsx from "clsx";

const measurementFields = [
    { label: "Poitrine", name: "chest", unit: "cm" },
    { label: "Sous poitrine", name: "underbust", unit: "cm" },
    { label: "Taille", name: "waist", unit: "cm" },
    { label: "Ventre", name: "belly", unit: "cm" },
    { label: "Fesses", name: "hips", unit: "cm" },
    { label: "Cuisse", name: "thigh", unit: "cm" },
    { label: "Bras", name: "arm", unit: "cm" },
    { label: "Poids", name: "weight", unit: "kg" },
];

export default function MeasurementsDetails({
    measurement,
    targetWeight,
    previousMeasurement,
}: {
    measurement: Measurement;
    targetWeight?: number;
    previousMeasurement?: Measurement;
}) {
    console.log("mesure", measurement.weight);
    console.log("cible", targetWeight);

    let isLooseWeightGoal: boolean | null = null;
    if (
        targetWeight !== null &&
        targetWeight !== undefined &&
        measurement.weight !== null &&
        measurement.weight !== undefined
    ) {
        console.log("condition OK");
        isLooseWeightGoal = measurement.weight > targetWeight;
    }

    function formatMeasurementDifference(
        current: number,
        previous: number
    ): { formatted: string; color: string | null } {
        // console.log(isLooseWeightGoal);

        const difference = current - previous;
        if (difference === 0) {
            return {
                formatted: "0",
                color: null,
            };
        }
        let sign = "+";
        let color = null;
        if (difference < 0) {
            sign = "-";
            if (isLooseWeightGoal) {
                color = "text-success";
            } else if (isLooseWeightGoal === false) {
                color = "text-destructive";
            }
        } else {
            if (isLooseWeightGoal) {
                color = "text-destructive";
            } else if (isLooseWeightGoal === false) {
                color = "text-success";
            }
        }
        return {
            formatted: `${sign} ${Math.abs(difference).toFixed(1)}`,
            color,
        };
    }

    return (
        <ul className={clsx("grid gap-y-3", previousMeasurement ? "grid-cols-3" : "grid-cols-2")}>
            {measurementFields.map((item) => {
                const value = measurement[item.name as keyof Measurement];
                const prevValue = previousMeasurement?.[item.name as keyof Measurement];

                let displayValue = "-";
                if (value instanceof Date) {
                    displayValue = value.toLocaleDateString();
                } else if (typeof value === "number" && value !== null) {
                    displayValue = `${value} ${item.unit}`;
                }

                let difference: { formatted: string; color: string | null } = { formatted: "", color: null };
                if (
                    previousMeasurement &&
                    typeof value === "number" &&
                    value !== null &&
                    typeof prevValue === "number" &&
                    prevValue !== null
                ) {
                    difference = formatMeasurementDifference(value, prevValue);
                }
                return (
                    <li key={item.name} className="contents">
                        <h3>{item.label}</h3>
                        <span className="text-right">{displayValue}</span>
                        {previousMeasurement && (
                            <span className={clsx("text-right", difference.color ? difference.color : "text-inherit")}>
                                {difference.formatted} {item.unit}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
