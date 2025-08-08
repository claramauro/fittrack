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
    previousMeasurement,
}: {
    measurement: Measurement;
    previousMeasurement?: Measurement;
}) {
    function toNumber(value: unknown): number | null {
        if (typeof value === "number" && !isNaN(value)) return value;
        if (typeof value === "string" && value.trim() !== "" && !isNaN(Number(value))) {
            return Number(value);
        }
        return null;
    }

    function formatMeasurementDifference(
        current: number,
        previous: number
    ): { formatted: string; sign: string | null } {
        const difference = current - previous;
        if (difference === 0) {
            return {
                formatted: "0",
                sign: null,
            };
        }
        let sign = "+";
        if (difference < 0) {
            sign = "-";
        }
        return {
            formatted: `${sign} ${Math.abs(difference).toFixed(1)}`,
            sign,
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
                } else {
                    const numValue = toNumber(value);
                    if (numValue !== null) {
                        displayValue = `${numValue} ${item.unit}`;
                    }
                }

                let difference: { formatted: string; sign: string | null } = { formatted: "", sign: null };
                if (previousMeasurement) {
                    const numValue = toNumber(value);
                    const numPrevValue = toNumber(prevValue);
                    if (numValue !== null && numPrevValue !== null) {
                        difference = formatMeasurementDifference(numValue, numPrevValue);
                    }
                }
                return (
                    <li key={item.name} className="contents">
                        <h3>{item.label}</h3>
                        <span className="text-right">{displayValue}</span>
                        {previousMeasurement && (
                            <span
                                className={clsx(
                                    "text-right",
                                    difference.sign === "+"
                                        ? "text-destructive"
                                        : difference.sign === "-"
                                        ? "text-success"
                                        : "text-inherit"
                                )}>
                                {difference.formatted} {item.unit}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
