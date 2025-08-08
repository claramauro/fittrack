import { getMeasurementsByUserId } from "@/libs/server/database/measurement";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import { Measurement } from "@/libs/types/measurement";
import Button from "@/ui/components/button";
import Chart from "@/ui/components/chart";
import MeasurementsDetails from "@/ui/components/measurementsDetails";
import { Skeleton } from "@/ui/shadcn/components/ui/skeleton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const user = session.user;

    const measurements = await getMeasurementsByUserId(user.id);
    console.log(typeof measurements[0].chest);

    if (!measurements.length) {
        // ?
    }

    return (
        <div className="pt-10">
            <h1 className="mb-10 text-4xl font-poppins font-medium mx-auto max-w-[calc(370px*2+1.5rem)] xl:max-w-[calc(450px*2+1.5rem)]">
                Hello {user?.firstname} !
            </h1>
            <div className="mb-10 flex gap-6 flex-wrap justify-center min-[500px]:flex-nowrap">
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[120px] h-[120px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    <div className="p-4 md:p-6 flex flex-col h-full">
                        <h3 className="text-center text-md sm:text-left sm:text-lg md:text-xl">Poids actuel</h3>
                        <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-lg min-[530px]:text-2xl md:text-3xl">
                            {measurements[0].weight} kg
                        </div>
                    </div>
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[120px] h-[120px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    {/*
                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-center sm:text-left sm:text-lg">Poids cible</h3>
                            <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-xl text-3xl sm:text-4xl">
                                60 kg
                            </div>
                        </div>
                    */}
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm flex flex-col w-[120px] h-[120px] min-[530px]:w-auto min-[530px]:h-auto aspect-square min-[500px]:basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/5">
                    {/*
                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-center sm:text-left sm:text-lg">Écart</h3>
                            <div className="flex-grow flex items-center justify-center font-bold max-[530px]:text-xl text-3xl sm:text-4xl">
                                + 7 kg
                            </div>
                        </div>
                    */}
                </div>
            </div>
            <div className="mb-10">
                {/* {isLoading ? (
                    <Skeleton className="max-w-6xl mx-auto min-h-[423px] md:min-h-[493px] lg:min-h-[635px] xl:min-h-[727px] w-full" />
                ) : (
                    <Chart />
                )} */}
            </div>
            <div className="mx-auto max-w-[calc(370px*2+1.5rem)] xl:max-w-[calc(450px*2+1.5rem)]">
                <h2 className="mb-2 font-poppins text-lg font-bold">Mes dernières mesures</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-6 justify-center items-center">
                    <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px]">
                        <div className="mb-1 max-lg:text-sm text-right">
                            {measurements[0].measuredAt.toLocaleDateString()}
                        </div>
                        <div className="border border-zinc-200 px-4 py-5 min-[400px]:p-6 xl:p-8 rounded-md shadow-sm lg:text-lg">
                            <MeasurementsDetails
                                measurement={measurements[0]}
                                previousMeasurement={measurements.length > 0 ? measurements[1] : undefined}
                            />
                        </div>
                    </div>
                    {measurements.length === 1 ? (
                        <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px] flex flex-col">
                            <div className="mb-1 max-lg:text-sm invisible">-</div>
                            <div className="border border-zinc-200 px-4 py-5 min-[400px]:p-6 xl:p-8 rounded-md shadow-sm lg:text-lg flex-1 flex flex-col justify-center items-center">
                                <p>Aucune autre mesure enregistré</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full md:w-1/2 max-w-[370px] xl:max-w-[450px]">
                            <div className="mb-1 max-lg:text-sm text-right">
                                {measurements[1].measuredAt.toLocaleDateString()}
                            </div>
                            <div className="border border-zinc-200 px-4 py-5 min-[400px]:p-6 xl:p-8 rounded-md shadow-sm lg:text-lg">
                                <MeasurementsDetails measurement={measurements[1]} />
                            </div>
                        </div>
                    )}
                </div>
                <Button className="block mx-auto">
                    <Link href={"/mesures"}>Voir l&apos;historique</Link>
                </Button>
            </div>
        </div>
    );
}
