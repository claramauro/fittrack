"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../shadcn/components/ui/chart";

function generateTicks(min: number, max: number, step: number): number[] {
    const ticks = [];
    for (let val = min; val <= max; val += step) {
        ticks.push(val);
    }
    return ticks;
}

export default function Chart() {
    const weightData = [
        { date: "2025-06-01", weight: 69 },
        { date: "2025-06-05", weight: 68.5 },
        { date: "2025-06-12", weight: 68 },
        { date: "2025-06-20", weight: 65 },
        { date: "2025-06-28", weight: 60 },
    ];

    // Arrondi pour le domaine Y (on arrondi sur 5)
    const weights = weightData.map((data) => Math.round(data.weight));
    const minRange = Math.floor(Math.min(...weights) / 5) * 5; // arrondi vers le bas
    const maxRange = Math.ceil(Math.max(...weights) / 5) * 5; // arrondi vers le haut

    // Génération des ticks tous les 5
    const yTicks = generateTicks(minRange, maxRange, 5);

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
            <CardContent className="overflow-x-auto">
                <ChartContainer config={chartConfig} className="min-h-[300px] min-w-[500px] w-full">
                    <LineChart
                        className="w-full"
                        height={300}
                        accessibilityLayer
                        data={weightData}
                        margin={{
                            top: 0,
                            bottom: 0,
                            left: -25,
                            right: 20,
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(5)}
                        />
                        <YAxis
                            dataKey={"kg"}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={[minRange, maxRange]}
                            ticks={yTicks}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel valueFormatter={(value) => `${value} kg`} />}
                        />
                        <Line dataKey="weight" type="linear" stroke="var(--main)" strokeWidth={1.5} dot={true} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
