import { Measurement } from "@/libs/types/measurement";
import Button from "@/ui/components/button";
import MeasurementsDetails from "@/app/(main)/(dashboard)/measurementsDetails";
import clsx from "clsx";
import Link from "next/link";
import moment from "moment";

export default function MeasurementsDetailsSection({
    measurements,
    isLooseWeightGoal = null,
}: {
    measurements: Measurement[];
    isLooseWeightGoal: boolean | null;
}) {
    return (
        <div className="">
            <h2 className="mb-2 font-poppins text-lg font-bold">Mes dernières mesures</h2>
            {!measurements.length ? (
                <div className="card mb-8 px-4 py-5 min-[400px]:p-6 xl:p-8 text-center lg:text-lg">
                    <p>Aucune mesure enregistrée</p>
                </div>
            ) : (
                <div
                    className={clsx(
                        "flex flex-col md:flex-row mb-8 justify-center items-center md:items-stretch ",
                        measurements.length === 1 ? "gap-2 md:gap-6" : "gap-6"
                    )}>
                    <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px]">
                        <div className="mb-1 max-lg:text-sm text-right">
                            {moment(measurements[0].measuredAt).format("DD/MM/YYYY")}
                        </div>
                        <div className="card px-4 py-5 min-[400px]:p-6 xl:p-8 rounded-md shadow-sm lg:text-lg">
                            <MeasurementsDetails
                                measurement={measurements[0]}
                                previousMeasurement={measurements.length > 0 ? measurements[1] : undefined}
                                isLooseWeightGoal={isLooseWeightGoal}
                                showDifference={true}
                            />
                        </div>
                    </div>
                    {measurements.length === 1 ? (
                        <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px] flex flex-col">
                            <div className="mb-1 max-lg:text-sm invisible">-</div>
                            <div className="card px-4 py-5 min-[400px]:p-6 xl:p-8 lg:text-lg flex-1 flex flex-col justify-center items-center">
                                <p>Aucune autre mesure enregistrée</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px]">
                            <div className="mb-1 max-lg:text-sm text-right">
                                {moment(measurements[1].measuredAt).format("DD/MM/YYYY")}
                            </div>
                            <div className="card px-4 py-5 min-[400px]:p-6 xl:p-8 lg:text-lg">
                                <MeasurementsDetails
                                    measurement={measurements[1]}
                                    isLooseWeightGoal={null}
                                    showDifference={false}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="text-center">
                <Button asChild>
                    <Link href={"/mesures"}>Voir toutes mes mesures</Link>
                </Button>
            </div>
        </div>
    );
}
