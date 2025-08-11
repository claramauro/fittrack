"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../shadcn/components/ui/chart";
import { Measurement } from "@/libs/types/measurement";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

function generateYTicks(min: number, max: number, step: number): number[] {
    const ticks = [min - step];
    for (let val = min; val <= max; val += step) {
        ticks.push(val);
    }
    ticks.push(max + step);
    return ticks;
}

export default function Chart({ measurements }: { measurements: Measurement[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);

    const weightData = useMemo(() => {
        const data: { date: string; weight: number }[] = [];
        measurements.map((measurement) => {
            if (measurement.weight && !isNaN(Number(measurement.weight))) {
                const weight = Number(Number(measurement.weight).toFixed(2));
                const date = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit" }).format(
                    measurement.measuredAt
                );

                data.unshift({ date, weight });
            }
        });
        return data;
    }, [measurements]);

    // Axe Y
    const step = 3;
    const weights = weightData.map((data) => Math.round(data.weight));
    const minRange = Math.floor(Math.min(...weights) / step) * step;
    const maxRange = Math.ceil(Math.max(...weights) / step) * step;
    const yTicks = generateYTicks(minRange, maxRange, step);

    // Axe X
    const minPointSpacing = 40;
    const baseWidth = 130; // Marges et espace pour l'axe Y

    // Largeur minimale requise pour maintenir l'espacement minimal
    const minRequiredWidth = weightData.length * minPointSpacing + baseWidth;

    // Scroller tout à droite à la dernière valeur
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollLeft = container.scrollWidth - container.clientWidth;
        }
    }, [weightData]);

    // Afficher axe Y à droite si scroll horizontal visible
    useEffect(() => {
        let timeout: NodeJS.Timeout | null;

        function checkScrollable() {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                setIsScrollable(container.scrollWidth > container.clientWidth);
            }
        }

        function handleResize() {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(checkScrollable, 150);
        }

        checkScrollable();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", checkScrollable);
        };
    }, [weightData]);

    const chartConfig: ChartConfig = {
        weight: {
            label: "Poids",
            color: "var(--main)",
        },
    };

    return (
        <Card className="border-zinc-200 shadow-sm max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="font-poppins text-lg">Évolution du poids</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0 pl-6" ref={scrollContainerRef}>
                <ChartContainer
                    config={chartConfig}
                    style={{
                        minWidth: `${minRequiredWidth}px`,
                    }}
                    className="min-h-[300px] min-w-[300px] sm:min-w-[500px] w-full overflow-x-auto">
                    <LineChart
                        className="w-full -ml-8 sm:-ml-8"
                        width={minRequiredWidth}
                        height={300}
                        accessibilityLayer
                        data={weightData}
                        margin={{
                            top: 0,
                            bottom: 0,
                            // left: -25,
                            right: -30,
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis
                            yAxisId="left"
                            dataKey={"kg"}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[minRange, maxRange]}
                            ticks={yTicks}
                            orientation="left"
                        />
                        <YAxis
                            yAxisId="right"
                            className={clsx(!isScrollable && "hidden")}
                            dataKey={"kg"}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[minRange, maxRange]}
                            ticks={yTicks}
                            orientation="right"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel valueFormatter={(value) => `${value} kg`} />}
                        />
                        <Line
                            dataKey="weight"
                            yAxisId="left"
                            type="linear"
                            stroke="var(--main)"
                            strokeWidth={1.5}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
