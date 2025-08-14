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
import WeightGoalForm from "./weightGoalForm";

export default function WeightGoalModal({ mode, initialValue }: { mode: "create" | "edit"; initialValue?: string }) {
    const isEdit = mode === "edit";
    return (
        <Dialog>
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
                <WeightGoalForm isEdit={isEdit} initialValue={initialValue}>
                    {(pending) => (
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
                    )}
                </WeightGoalForm>
            </DialogContent>
        </Dialog>
    );
}
