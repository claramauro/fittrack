"use client";

import { createMeasurements } from "@/app/actions/measurementsActions";
import { Measurement } from "@/libs/types/measurement";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { useActionState } from "react";

const initialState = {
    status: "",
    message: "",
};

export default function AddMeasuresForm({ latestMeasurement }: { latestMeasurement: Measurement | null }) {
    const [state, formAction, pending] = useActionState(createMeasurements, initialState);

    return (
        <div className="card p-6 max-w-[750px] mx-auto">
            <form action={formAction} className="flex flex-col gap-6">
                <div className="w-min">
                    <Label htmlFor="measuredAt" className="mb-2">
                        Date
                    </Label>
                    <Input
                        type="date"
                        id="measuredAt"
                        name="measuredAt"
                        min={new Date("1900-01-01").toISOString().slice(0, 10)}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        className="input"
                    />
                </div>
                <div className="grid max-[320px]:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="">
                        <Label htmlFor="chest" className="mb-2">
                            Poitrine
                        </Label>
                        <Input
                            type="number"
                            id="chest"
                            name="chest"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.chest ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="underbust" className="mb-2">
                            Sous poitrine
                        </Label>
                        <Input
                            type="number"
                            id="underbust"
                            name="underbust"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.underbust ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="waist" className="mb-2">
                            Taille
                        </Label>
                        <Input
                            type="number"
                            id="waist"
                            name="waist"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.waist ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="belly" className="mb-2">
                            Ventre
                        </Label>
                        <Input
                            type="number"
                            id="belly"
                            name="belly"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.belly ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="hips" className="mb-2">
                            Hanches
                        </Label>
                        <Input
                            type="number"
                            id="hips"
                            name="hips"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.hips ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="thigh" className="mb-2">
                            Cuisse
                        </Label>
                        <Input
                            type="number"
                            id="thigh"
                            name="thigh"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.thigh ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="arm" className="mb-2">
                            Bras
                        </Label>
                        <Input
                            type="number"
                            id="arm"
                            name="arm"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.arm ?? ""}
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="weight" className="mb-2">
                            Poids
                        </Label>
                        <Input
                            type="number"
                            id="weight"
                            name="weight"
                            min={0}
                            step={0.1}
                            className="input"
                            defaultValue={latestMeasurement?.weight ?? ""}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-1/2 mx-auto">
                    Ajouter
                </Button>
            </form>
        </div>
    );
}
