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
import { Loader2Icon, PlusIcon } from "lucide-react";
import CreateWeightGoalForm from "./createWeightGoalForm";

export default function CreateWeightGoalModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    title="Définir un objectif"
                    aria-label="Définir un objectif"
                    className="rounded-full size-5 max-sm:p-0! sm:size-6 cursor-pointer hover:opacity-100 hover:scale-110">
                    <PlusIcon className="size-3" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Définir un nouvel objectif</DialogTitle>
                </DialogHeader>
                <CreateWeightGoalForm>
                    {(pending) => (
                        <DialogFooter className="mt-6">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={pending}>
                                {!pending ? "Créer" : <Loader2Icon className="animate-spin" />}
                            </Button>
                        </DialogFooter>
                    )}
                </CreateWeightGoalForm>
            </DialogContent>
        </Dialog>
    );
}
