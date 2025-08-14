"use client";

import { createWeightGoal } from "@/app/actions/weightGoalActions";
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
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import { PlusIcon } from "lucide-react";

export default function CreateWeightGoalModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="rounded-full size-6 cursor-pointer hover:opacity-100 hover:scale-110">
                    <PlusIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-4">
                    <DialogTitle>Créer un nouvel objectif</DialogTitle>
                </DialogHeader>
                <form action={createWeightGoal}>
                    <Label className="mb-4" htmlFor="targetWeight">
                        Poids cible
                    </Label>
                    <Input type="number" name="targetWeight" id="targetWeight" min={0} step={0.1} />
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
