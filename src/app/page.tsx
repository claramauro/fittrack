import Chart from "@/ui/components/chart";

export default function Dashboard() {
    return (
        <div className="pt-10">
            <h1 className="mb-10">Hello Clara !</h1>
            <div className="mb-10 flex gap-6 max-[500px]:flex-wrap justify-center flex-nowrap">
                <div className="border border-zinc-200 shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Poids actuel</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        67 kg
                    </div>
                </div>
                <div className="border border-zinc-200 shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Poids cible</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        60 kg
                    </div>
                </div>
                <div className="border border-zinc-200 shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Écart</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        + 7 kg
                    </div>
                </div>
            </div>
            <div>
                <Chart />
            </div>
        </div>
    );
}
