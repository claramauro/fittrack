import { getMeasurementsByUserId } from "@/libs/server/database/measurement";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import Chart from "@/ui/components/chart";
import { redirect } from "next/navigation";
import MeasurementsSection from "./measurementsSection";
import { getActiveGoalByUser } from "@/libs/server/database/weight_goal";
import { Measurement } from "@/libs/types/measurement";
import { WeightGoal } from "@/libs/types/weigthGoal";
import clsx from "clsx";
import WeightGoalModal from "./weightGoalModal";

function getLatestWeight(measurements: Measurement[]) {
    let latestWeight = null;
    for (let i = 0; i < measurements.length; i++) {
        if (measurements[i]?.weight) {
            latestWeight = measurements[i].weight;
            break;
        }
    }
    return latestWeight;
}

function getWeightDifference(
    currentWeight: number | string | null,
    weightTarget: number | string | null
): number | null {
    if (!currentWeight || !weightTarget) {
        return null;
    }
    const currentWeightValue = Number(currentWeight);
    const weightTargetValue = Number(weightTarget);

    if (isNaN(currentWeightValue) || isNaN(weightTargetValue)) {
        return null;
    }

    const difference = currentWeightValue - weightTargetValue;
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
            <div className="mb-10 flex gap-6 flex-wrap justify-center min-[500px]:flex-nowrap">
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[130px] h-[130px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    <div className="p-4 md:p-6 flex flex-col h-full">
                        <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">Poids actuel</h3>
                        <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-lg min-[530px]:text-2xl md:text-3xl">
                            {currentWeight ? `${currentWeight} kg` : "-"}
                        </div>
                    </div>
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[130px] h-[130px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    <div className="p-4 md:p-6 flex flex-col h-full">
                        {weightGoal?.targetWeight ? (
                            <div className="flex justify-between gap-2">
                                <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">
                                    Poids cible
                                </h3>
                                <WeightGoalModal
                                    mode="edit"
                                    initialValue={weightGoal.targetWeight.toString()}
                                    weightGoalId={weightGoal.id}
                                />
                            </div>
                        ) : (
                            <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">Poids cible</h3>
                        )}
                        <div
                            className={clsx(
                                "flex-grow flex items-center justify-center",
                                !weightGoal && "flex-col gap-1 sm:gap-4"
                            )}>
                            {weightGoal?.targetWeight ? (
                                <p className="font-bold max-[530px]:text-lg min-[530px]:text-2xl md:text-3xl">
                                    {weightGoal.targetWeight} kg
                                </p>
                            ) : (
                                <>
                                    <WeightGoalModal mode="create" />
                                    <p className="text-center text-sm sm:text-base -p-4">Aucun objectif défini</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[130px] h-[130px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    <div className="p-4 md:p-6 flex flex-col h-full">
                        <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">Écart</h3>
                        <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-lg min-[530px]:text-2xl md:text-3xl">
                            <p
                                className={clsx(
                                    weightDifference ? (weightDifference > 0 ? "text-destructive" : "text-success") : ""
                                )}>
                                {weightDifference ? `${weightDifference > 0 ? "+" : ""}${weightDifference} kg` : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <Chart measurements={measurements} weightTarget={Number(weightGoal?.targetWeight)} />
            </div>
            <MeasurementsSection measurements={measurements} />
        </div>
    );
}
