import { getMeasurementsByUserId } from "@/libs/server/database/measurement";
import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import Chart from "@/ui/components/chart";
import { redirect } from "next/navigation";
import MeasurementsSection from "./measurementsSection";

export default async function DashboardPage() {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const user = session.user;

    const measurements = await getMeasurementsByUserId(user.id);

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
                <Chart measurements={measurements} />
            </div>
            <MeasurementsSection measurements={measurements} />
        </div>
    );
}
