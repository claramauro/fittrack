import { getMeasurementsByUserId } from "@/libs/server/database/measurement";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import Chart from "@/ui/components/chart";
import { redirect } from "next/navigation";
import MeasurementsSection from "./measurementsDetailsSection";
import { getActiveGoalByUser } from "@/libs/server/database/weight_goal";
import { Measurement } from "@/libs/types/measurement";
import { WeightGoal } from "@/libs/types/weigthGoal";
import WeightSummarySection from "./WeightSummarySection";

function getLatestWeight(measurements: Measurement[]) {
    for (let i = 0; i < measurements.length; i++) {
        const weight = measurements[i]?.weight;
        if (weight !== null && weight !== undefined) {
            return weight;
        }
    }
    return null;
}

function getWeightDifference(currentWeight: number | null, weightTarget: number | null): number | null {
    if (currentWeight === null || weightTarget === null) {
        return null;
    }
    const difference = currentWeight - weightTarget;
    return Number(difference.toFixed(2));
}

export default async function DashboardPage() {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const user = session.user;

    let measurements: Measurement[] = [];
    let weightGoal: WeightGoal | null = null;
    let currentWeight = null;
    let weightDifference: number | null = null;

    try {
        [measurements, weightGoal] = await Promise.all([
            getMeasurementsByUserId(user.id),
            getActiveGoalByUser(user.id),
        ]);
        currentWeight = getLatestWeight(measurements);
        weightDifference = getWeightDifference(currentWeight, weightGoal?.targetWeight ?? null);
    } catch {
        throw new Error("Une erreur est survenue, veuillez recharger la page.");
    }

    return (
        <div className="pt-10">
            <h1 className="mb-10 text-4xl font-poppins font-medium mx-auto max-w-[calc(370px*2+1.5rem)] xl:max-w-[calc(450px*2+1.5rem)]">
                Hello {user?.firstname} !
            </h1>
            <WeightSummarySection
                currentWeight={currentWeight}
                weightGoal={weightGoal}
                weightDifference={weightDifference}
            />
            <div className="mb-10">
                <Chart measurements={measurements} weightTarget={Number(weightGoal?.targetWeight)} />
            </div>
            <MeasurementsSection measurements={measurements} />
        </div>
    );
}
