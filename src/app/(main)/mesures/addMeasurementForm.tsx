"use client";

import { createMeasurementAction } from "@/app/actions/measurementActions";
import { Measurement } from "@/libs/types/measurement";
import Button from "@/ui/components/button";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddMeasurementForm({ latestMeasurement }: { latestMeasurement: Measurement }) {
    const initialState = {
        status: "",
        message: "",
        data: {
            measuredAt: moment().format("YYYY-MM-DD"),
            chest: latestMeasurement?.chest?.toString() ?? "",
            underbust: latestMeasurement?.underbust?.toString() ?? "",
            waist: latestMeasurement?.waist?.toString() ?? "",
            belly: latestMeasurement?.belly?.toString() ?? "",
            hips: latestMeasurement?.hips?.toString() ?? "",
            thigh: latestMeasurement?.thigh?.toString() ?? "",
            arm: latestMeasurement?.arm?.toString() ?? "",
            weight: latestMeasurement?.weight?.toString() ?? "",
        },
        formErrors: null,
    };

    const [state, formAction, pending] = useActionState(createMeasurementAction, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            router.refresh();
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <div className="card p-6 max-w-[750px] mx-auto">
            <form action={formAction} className="flex flex-col gap-6">
                <h2 className="font-poppins text-lg font-bold">Ajouter une nouvelle mesure</h2>
                <div className="">
                    <Label htmlFor="measuredAt" className="mb-2 text-base">
                        Date
                    </Label>
                    <Input
                        type="date"
                        id="measuredAt"
                        name="measuredAt"
                        required
                        min={moment("1950-01-01").format("YYYY-MM-DD")}
                        //max={moment().format("YYYY-MM-DD")}
                        defaultValue={state.data.measuredAt}
                        className={clsx("input w-min text-base!", state?.formErrors?.measuredAt && "input-error")}
                        aria-describedby="measured-at-error"
                    />
                    <div id="measured-at-error" className="error-message mt-1">
                        {state?.formErrors?.measuredAt && state.formErrors.measuredAt}
                    </div>
                </div>
                <div className="grid max-[320px]:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="chest" className="mb-2 text-base">
                            Poitrine
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="chest"
                                name="chest"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.chest && "input-error")}
                                defaultValue={state.data.chest}
                                aria-describedby="chest-unit chest-error"
                            />
                            <span
                                id="chest-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="chest-error" className="error-message mt-1">
                            {state?.formErrors?.chest && state.formErrors.chest}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="underbust" className="mb-2 text-base">
                            Sous poitrine
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="underbust"
                                name="underbust"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.underbust && "input-error")}
                                defaultValue={state.data.underbust}
                                aria-describedby="underbust-unit underbust-error"
                            />
                            <span
                                id="underbust-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="underbust-error" className="error-message mt-1">
                            {state?.formErrors?.underbust && state.formErrors.underbust}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="waist" className="mb-2 text-base">
                            Taille
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="waist"
                                name="waist"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.waist && "input-error")}
                                defaultValue={state.data.waist}
                                aria-describedby="waist-unit waist-error"
                            />
                            <span
                                id="waist-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="waist-error" className="error-message mt-1">
                            {state?.formErrors?.waist && state.formErrors.waist}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="belly" className="mb-2 text-base">
                            Ventre
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="belly"
                                name="belly"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.belly && "input-error")}
                                defaultValue={state.data.belly}
                                aria-describedby="belly-unit belly-error"
                            />
                            <span
                                id="belly-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="belly-error" className="error-message mt-1">
                            {state?.formErrors?.belly && state.formErrors.belly}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="hips" className="mb-2 text-base">
                            Hanches
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="hips"
                                name="hips"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.hips && "input-error")}
                                defaultValue={state.data.hips}
                                aria-describedby="hips-unit hips-error"
                            />
                            <span
                                id="hips-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="hips-error" className="error-message mt-1">
                            {state?.formErrors?.hips && state.formErrors.hips}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="thigh" className="mb-2 text-base">
                            Cuisse
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="thigh"
                                name="thigh"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.thigh && "input-error")}
                                defaultValue={state.data.thigh}
                                aria-describedby="thigh-unit thigh-error"
                            />
                            <span
                                id="thigh-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="thigh-error" className="error-message mt-1">
                            {state?.formErrors?.thigh && state.formErrors.thigh}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="arm" className="mb-2 text-base">
                            Bras
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="arm"
                                name="arm"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.arm && "input-error")}
                                defaultValue={state.data.arm}
                                aria-describedby="arm-unit arm-error"
                            />
                            <span
                                id="arm-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                cm
                            </span>
                        </div>
                        <div id="arm-error" className="error-message mt-1">
                            {state?.formErrors?.arm && state.formErrors.arm}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="weight" className="mb-2 text-base">
                            Poids
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="weight"
                                name="weight"
                                min={0}
                                step={0.1}
                                className={clsx("input text-base!", state?.formErrors?.weight && "input-error")}
                                defaultValue={state.data.weight}
                                aria-describedby="weight-unit weight-error"
                            />
                            <span
                                id="weight-unit"
                                className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                                kg
                            </span>
                        </div>
                        <div id="weight-error" className="error-message mt-1">
                            {state?.formErrors?.weight && state.formErrors.weight}
                        </div>
                    </div>
                </div>
                <Button type="submit" className="w-1/2 mx-auto" disabled={pending}>
                    {pending ? <Loader2Icon className="animate-spin" /> : "Ajouter"}
                </Button>
            </form>
        </div>
    );
}
