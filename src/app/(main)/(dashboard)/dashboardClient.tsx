"use client";

import { useMeasurement } from "@/contexts/measurementContext";
import { useUser } from "@/contexts/userContext";
import Button from "@/ui/components/button";
import Chart from "@/ui/components/chart";
import { Skeleton } from "@/ui/shadcn/components/ui/skeleton";
import Link from "next/link";

export default function Dashboard() {
    // const { user } = useUser();
    // const { isLoading } = useMeasurement();

    return (
        <div className="pt-10">
            <h1 className="mb-10 text-4xl font-poppins font-medium">Hello {"toto"} !</h1>
            <div className="mb-10 flex gap-6 flex-wrap justify-center min-[520px]:flex-nowrap">
                <div className="border border-zinc-200 rounded-md shadow-sm aspect-square flex flex-col basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/6">
                    {/* {isLoading ? (
                        <Skeleton className="bg-zinc-200 size-full" />
                    ) : (
                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-center sm:text-left sm:text-lg">Poids actuel</h3>
                            <div className="flex-grow flex items-center justify-center font-bold max-[520px]:text-xl text-3xl sm:text-4xl">
                                67 kg
                            </div>
                        </div>
                    )} */}
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm aspect-square flex flex-col basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/6">
                    {/* {isLoading ? (
                        <Skeleton className="bg-zinc-200 size-full" />
                    ) : (
                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-center sm:text-left sm:text-lg">Poids cible</h3>
                            <div className="flex-grow flex items-center justify-center font-bold max-[520px]:text-xl text-3xl sm:text-4xl">
                                60 kg
                            </div>
                        </div>
                    )} */}
                </div>
                <div className="border border-zinc-200 rounded-md shadow-sm aspect-square flex flex-col basis-[calc(50%-0.75rem)] sm:basis-1/3 lg:basis-1/6">
                    {/* {isLoading ? (
                        <Skeleton className="bg-zinc-200 size-full" />
                    ) : (
                        <div className="p-6 flex flex-col h-full">
                            <h3 className="text-center sm:text-left sm:text-lg">Écart</h3>
                            <div className="flex-grow flex items-center justify-center font-bold max-[520px]:text-xl text-3xl sm:text-4xl">
                                + 7 kg
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
            <div className="mb-10">
                {/* {isLoading ? (
                    <Skeleton className="max-w-6xl mx-auto min-h-[423px] md:min-h-[493px] lg:min-h-[635px] xl:min-h-[727px] w-full" />
                ) : (
                    <Chart />
                )} */}
            </div>
            <div className=" max-w-6xl mx-auto">
                <h2 className="mb-2 font-poppins text-lg font-bold">Mes dernières mesures</h2>
                <div className="min-[600px]:flex gap-6 mb-6">
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
                <Button>
                    <Link href={"/mesures"}>Voir l&apos;historique</Link>
                </Button>
            </div>
        </div>
    );
}
