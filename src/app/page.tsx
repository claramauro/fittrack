import Chart from "@/ui/components/chart";
import { Button } from "@/ui/shadcn/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="pt-10">
            <h1 className="mb-10">Hello Clara !</h1>
            <div className="mb-10 flex gap-6 max-[500px]:flex-wrap justify-center flex-nowrap">
                <div className="border border-zinc-200 rounded-md shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Poids actuel</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        67 kg
                    </div>
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Poids cible</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        60 kg
                    </div>
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm p-6 w-1/3 lg:w-1/6 aspect-square flex flex-col">
                    <h2>Écart</h2>
                    <div className="flex-grow flex items-center justify-center font-bold max-[500px]:text-xl text-3xl sm:text-4xl">
                        + 7 kg
                    </div>
                </div>
            </div>
            <div className="mb-10">
                <Chart />
            </div>
            <div>
                <h2 className="mb-2">Mes dernières mesures</h2>
                <div className="min-[600px]:flex gap-4 mb-4">
                    <div className="w-full min-[600px]:w-1/2">
                        <div className="mb-1 text-sm text-right">01/07/2025</div>
                        <div className="border border-zinc-200 p-4 rounded-md shadow-sm">
                            <div className="grid grid-cols-3 min-[600px]:grid-cols-[auto_auto_auto] gap-3">
                                <div>Poitrine</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Sous poitrine</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Taille</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Ventre</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Fesses</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Cuisse</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Bras</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Poids</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full min-[600px]:w-1/2">
                        <div className="mb-1 text-sm text-right">01/06/2025</div>
                        <div className="border border-zinc-200 p-4 rounded-md shadow-sm">
                            <div className="grid grid-cols-3 min-[600px]:grid-cols-[auto_auto_auto] gap-3">
                                <div>Poitrine</div>
                                <div className="text-center">86cm</div>
                                <div className="text-center">- 12 cm</div>
                                <div>Sous poitrine</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Taille</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Ventre</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Fesses</div>
                                <div className="text-center">105cm</div>
                                <div className="text-center">-</div>
                                <div>Cuisse</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Bras</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                                <div>Poids</div>
                                <div className="text-center">80cm</div>
                                <div className="text-center">-</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button asChild className="bg-chart-2">
                    <Link href={"/mesures"}>Voir l'historique</Link>
                </Button>
            </div>
        </div>
    );
}
