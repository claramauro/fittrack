"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchMeasurements } from "@/libs/client/services/measurement";
import { Measurement } from "@/libs/types/measurement";

interface MeasurementContextType {
    measurements: Measurement[];
    isLoading: boolean;
    error: string;
}

const MeasurementContext = createContext<MeasurementContextType | null>(null);

export default function MeasurementProvider({ children }: { children: React.ReactNode }) {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMeasurements() {
            try {
                setIsLoading(true);
                const measurements = await fetchMeasurements();
                setMeasurements(measurements);
            } catch {
                setError("Error lors du chargement des données, veuillez réessayer en rechargeant la page.");
            } finally {
                setIsLoading(false);
            }
        }
        loadMeasurements();
    }, []);

    return (
        <MeasurementContext.Provider value={{ measurements, isLoading, error }}>{children}</MeasurementContext.Provider>
    );
}

export function useMeasurement() {
    const context = useContext(MeasurementContext);
    if (!context) {
        throw new Error("useMeasurement doit être utilisé dans un MeasurementProvider");
    }
    return context;
}
