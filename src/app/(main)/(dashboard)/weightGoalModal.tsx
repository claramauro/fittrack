"use client";

import Button from "@/ui/components/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/ui/shadcn/components/ui/dialog";
import { Loader2Icon, PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { WeightGoalActionState } from "@/libs/types/actionState";
import { createWeightGoalAction, updateWeightGoalAction } from "@/app/actions/weightGoalActions";
import { Label } from "@/ui/shadcn/components/ui/label";
import { Input } from "@/ui/shadcn/components/ui/input";
import clsx from "clsx";

const initialState: WeightGoalActionState = {
    status: "",
    message: "",
    formError: null,
};

export default function WeightGoalModal({
    mode,
    initialValue,
    weightGoalId,
}: {
    mode: "create" | "edit";
    initialValue?: string;
    weightGoalId?: string;
}) {
    const isEdit = mode === "edit";
    const serverAction = isEdit ? updateWeightGoalAction.bind(null, weightGoalId) : createWeightGoalAction;
    const [state, formAction, pending] = useActionState(serverAction, initialState);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            router.refresh();
            setOpen(false);
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <button
                        type="button"
                        title="Modifier l'objectif"
                        aria-label="Modifier l'objectif"
                        className="hover:cursor-pointer hover:scale-110">
                        <PencilIcon className="size-4.5 sm:size-5.5 text-gray-500" />
                    </button>
                ) : (
                    <Button
                        type="button"
                        title="Définir un objectif"
                        aria-label="Définir un objectif"
                        className="rounded-full size-5 max-sm:p-0! sm:size-6 cursor-pointer hover:opacity-100 hover:scale-110">
                        <PlusIcon className="size-3" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>{isEdit ? "Modifier l'objectif" : "Définir un nouvel objectif"}</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <Label className="mb-4" htmlFor="targetWeight">
                        Poids cible
                    </Label>
                    <Input
                        type="number"
                        name="targetWeight"
                        id="targetWeight"
                        defaultValue={initialValue ?? ""}
                        required
                        min={0}
                        step={0.1}
                        className={clsx("input", state.formError && "input-error")}
                    />
                    {state.formError && <p className="error-message mt-4">{state.formError}</p>}
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            {!pending ? isEdit ? "Modifier" : "Créer" : <Loader2Icon className="animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
