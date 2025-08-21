"use client";

import { createMeasurementsAction } from "@/app/actions/measurementsActions";
import { Measurement } from "@/libs/types/measurement";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddMeasuresForm({ latestMeasurement }: { latestMeasurement: Measurement }) {
    const initialState = {
        status: "",
        message: "",
        data: {
            measuredAt: new Date().toISOString().slice(0, 10),
            chest: latestMeasurement.chest?.toString() ?? "",
            underbust: latestMeasurement.underbust?.toString() ?? "",
            waist: latestMeasurement.waist?.toString() ?? "",
            belly: latestMeasurement.belly?.toString() ?? "",
            hips: latestMeasurement.hips?.toString() ?? "",
            thigh: latestMeasurement.thigh?.toString() ?? "",
            arm: latestMeasurement.arm?.toString() ?? "",
            weight: latestMeasurement.weight?.toString() ?? "",
        },
        formErrors: null,
    };

    const [state, formAction, pending] = useActionState(createMeasurementsAction, initialState);

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <div className="card p-6 max-w-[750px] mx-auto">
            <form action={formAction} className="flex flex-col gap-6">
                <h2 className="font-poppins text-lg font-bold">Ajouter de nouvelles mesures</h2>
                <div className="">
                    <Label htmlFor="measuredAt" className="mb-2">
                        Date
                    </Label>
                    <Input
                        type="date"
                        id="measuredAt"
                        name="measuredAt"
                        required
                        min={new Date("1900-01-01").toISOString().slice(0, 10)}
                        max={new Date().toISOString().slice(0, 10)}
                        defaultValue={state.data.measuredAt}
                        className={clsx("input w-min", state?.formErrors?.measuredAt && "input-error")}
                    />
                    <div className="error-message mt-1">
                        {state?.formErrors?.measuredAt && state.formErrors.measuredAt}
                    </div>
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
                            className={clsx("input", state?.formErrors?.chest && "input-error")}
                            defaultValue={state.data.chest}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.chest && state.formErrors.chest}</div>
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
                            className={clsx("input", state?.formErrors?.underbust && "input-error")}
                            defaultValue={state.data.underbust}
                        />
                        <div className="error-message mt-1">
                            {state?.formErrors?.underbust && state.formErrors.underbust}
                        </div>
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
                            className={clsx("input", state?.formErrors?.waist && "input-error")}
                            defaultValue={state.data.waist}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.waist && state.formErrors.waist}</div>
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
                            className={clsx("input", state?.formErrors?.belly && "input-error")}
                            defaultValue={state.data.belly}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.belly && state.formErrors.belly}</div>
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
                            className={clsx("input", state?.formErrors?.hips && "input-error")}
                            defaultValue={state.data.hips}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.hips && state.formErrors.hips}</div>
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
                            className={clsx("input", state?.formErrors?.thigh && "input-error")}
                            defaultValue={state.data.thigh}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.thigh && state.formErrors.thigh}</div>
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
                            className={clsx("input", state?.formErrors?.arm && "input-error")}
                            defaultValue={state.data.arm}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.arm && state.formErrors.arm}</div>
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
                            className={clsx("input", state?.formErrors?.weight && "input-error")}
                            defaultValue={state.data.weight}
                        />
                        <div className="error-message mt-1">{state?.formErrors?.weight && state.formErrors.weight}</div>
                    </div>
                </div>
                {state.status === "error" && <p className="error-message">{state.message}</p>}
                <Button type="submit" className="w-1/2 mx-auto" disabled={pending}>
                    {pending ? <Loader2Icon className="animate-spin" /> : "Ajouter"}
                </Button>
            </form>
        </div>
    );
}
