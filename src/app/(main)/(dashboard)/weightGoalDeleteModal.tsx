"use client";

import { archiveWeightGoal } from "@/app/actions/weightGoalActions";
import AlertModal from "@/ui/components/alertModal";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useActionState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/ui/shadcn/components/ui/alert-dialog";
import Button from "@/ui/components/button";

const initialState = {
    status: "",
    message: "",
};

export default function WeightGoalDeleteModal({ weightGoalId }: { weightGoalId: string }) {
    const serverAction = archiveWeightGoal.bind(null, weightGoalId);

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

                    <AlertDialogAction asChild>
                        <form action={formAction} className="bg-destructive! hover:opacity-80 cursor-pointer">
                            <Button
                                type="submit"
                                disabled={pending}
                                className={`bg-destructive hover:bg-destructive cursor-pointer`}>
                                {pending ? <Loader2Icon className="animate-spin" /> : "Supprimer"}
                            </Button>
                        </form>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

    // return (
    //     <AlertModal
    //         title="Supprimer cet objectif"
    //         description="Êtes-vous sûr de vouloir supprimer cet objectif ?"
    //         actionButton={{ text: "Supprimer", color: "bg-destructive hover:bg-destructive" }}
    //         formAction={serverAction}
    //         triggerButton={
    //             <button
    //                 title="Supprimer l'objectif"
    //                 aria-label="Supprimer l'objectif"
    //                 className="hover:cursor-pointer hover:scale-110">
    //                 <Trash2Icon className="size-4.5 sm:size-5.5 text-rose-400" />
    //             </button>
    //         }
    //     />
    // );
}
