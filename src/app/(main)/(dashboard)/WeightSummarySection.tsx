import React from "react";
import WeightGoalModal from "./weightGoalModal";
import WeightGoalDeleteModal from "./weightGoalDeleteModal";
import clsx from "clsx";
import { WeightGoal } from "@/libs/types/weigthGoal";

export default function WeightSummarySection({
    currentWeight,
    weightGoal,
    weightDifference,
}: {
    currentWeight: number | null;
    weightGoal: WeightGoal | null;
    weightDifference: number | null;
}) {
    return (
        <div className="mb-10 flex gap-4 flex-wrap justify-center min-[530px]:flex-nowrap">
            <div className="card flex flex-col w-[160px] h-[160px] min-[530px]:w-auto min-[530px]:h-auto min-lg:max-w-[225px] aspect-square min-[530px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 ">
                <div className="p-4 md:p-6 flex flex-col h-full">
                    <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">Poids actuel</h3>
                    <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-lg min-[530px]:text-2xl md:text-3xl">
                        {currentWeight ? `${currentWeight} kg` : "-"}
                    </div>
                </div>
            </div>
            <div className="card flex flex-col w-[160px] h-[160px] min-[530px]:w-auto min-[530px]:h-auto min-lg:max-w-[225px] aspect-square min-[530px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 ">
                <div className="p-4 md:p-6 flex flex-col h-full">
                    {weightGoal?.targetWeight ? (
                        <div className="flex justify-between items-start gap-1">
                            <h3 className="text-center text-base sm:text-left sm:text-lg md:text-xl">Poids cible</h3>
                            <div className="flex gap-1">
                                <WeightGoalModal
                                    mode="edit"
                                    initialValue={weightGoal.targetWeight.toString()}
                                    weightGoalId={weightGoal.id}
                                />
                                <WeightGoalDeleteModal weightGoalId={weightGoal.id} />
                            </div>
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
            <div className="card flex flex-col w-[160px] h-[160px] min-[530px]:w-auto min-[530px]:h-auto min-lg:max-w-[225px] aspect-square min-[530px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 ">
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
    );
}
