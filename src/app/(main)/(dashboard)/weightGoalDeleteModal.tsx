"use client";

import { archiveWeightGoalAction } from "@/app/actions/weightGoalActions";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useActionState } from "react";

import Button from "@/ui/components/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/ui/shadcn/components/ui/alert-dialog";

const initialState = {
    status: "",
    message: "",
};

export default function WeightGoalDeleteModal({ weightGoalId }: { weightGoalId: string }) {
    const serverAction = archiveWeightGoalAction.bind(null, weightGoalId);
    const [state, formAction, pending] = useActionState(serverAction, initialState);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    title="Supprimer l'objectif"
                    aria-label="Supprimer l'objectif"
                    className="hover:cursor-pointer hover:scale-110">
                    <Trash2Icon className="size-4.5 sm:size-5.5 text-rose-400" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer cet objectif</AlertDialogTitle>
                    <AlertDialogDescription>Êtes-vous sûr de vouloir supprimer cet objectif ?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <form action={formAction}>
                        <Button
                            type="submit"
                            title="Confirmer la suppression"
                            aria-label="Confirmer la suppression"
                            disabled={pending}
                            className={`bg-destructive hover:bg-destructive cursor-pointer`}>
                            {pending ? <Loader2Icon className="animate-spin" /> : "Supprimer"}
                        </Button>
                    </form>
                </AlertDialogFooter>
                {state && state.status === "error" && <p className="error-message">{state.message}</p>}
            </AlertDialogContent>
        </AlertDialog>
    );
}
