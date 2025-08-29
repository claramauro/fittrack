import { getMeasurementsByUser } from "@/libs/server/database/measurement";
import Chart from "@/ui/components/chart";
import { redirect } from "next/navigation";
import { getActiveGoalByUser } from "@/libs/server/database/weight_goal";
import { Measurement } from "@/libs/types/measurement";
import { WeightGoal } from "@/libs/types/weigthGoal";
import WeightSummarySection from "./WeightSummarySection";
import MeasurementsDetailsSection from "./measurementsDetailsSection";
import { getLatestWeight, getWeightDifference } from "@/libs/utils/measurementUtils";
import { getServerAuthSession } from "@/libs/server/nextAuth";

export default async function DashboardPage() {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const user = session.user;

    let measurements: Measurement[] = [];
    let weightGoal: WeightGoal | null = null;
    let currentWeight: number | null = null;
    let weightDifference: number | null = null;
    let isLooseWeightGoal: boolean | null = null;

    try {
        [measurements, weightGoal] = await Promise.all([getMeasurementsByUser(user.id), getActiveGoalByUser(user.id)]);
        currentWeight = getLatestWeight(measurements);
        weightDifference = getWeightDifference(currentWeight, weightGoal?.targetWeight ?? null);
        if (currentWeight && weightGoal?.targetWeight) {
            isLooseWeightGoal = currentWeight > weightGoal.targetWeight;
        }
    } catch {
        throw new Error("Une erreur est survenue, veuillez recharger la page.");
    }

    return (
        <div className="pt-10">
            <h1 className="mb-10 text-4xl font-poppins font-medium">Hello {user?.firstname} !</h1>
            <WeightSummarySection
                currentWeight={currentWeight}
                weightGoal={weightGoal}
                weightDifference={weightDifference}
            />
            <div className="mb-10">
                <Chart measurements={measurements} weightTarget={weightGoal?.targetWeight} />
            </div>
            <MeasurementsDetailsSection measurements={measurements} isLooseWeightGoal={isLooseWeightGoal} />
        </div>
    );
}
