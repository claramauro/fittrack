import { deleteMeasurementAction } from "@/app/actions/measurementActions";
import { ActionState } from "@/libs/types/actionState";
import { Measurement } from "@/libs/types/measurement";
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
import { Loader2Icon, Trash2Icon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialState: ActionState = {
    status: "",
    message: "",
};

export default function DeleteMeasurementModal({ measurement }: { measurement: Measurement }) {
    const serverAction = deleteMeasurementAction.bind(null, measurement.id);
    const [state, formAction, pending] = useActionState(serverAction, initialState);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (state.status === "success") {
            toast.success(state.message);
            setOpen(false);
            router.refresh();
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button
                    title="Supprimer ces données"
                    aria-label="Supprimer ces données"
                    className="hover:cursor-pointer hover:scale-110">
                    <Trash2Icon className="size-4.5 text-rose-400" />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Supprimer les mesures du {moment(measurement.measuredAt).format("DD/MM/YYYY")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>Êtes-vous sûr de vouloir supprimer ces mesures ?</AlertDialogDescription>
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
            </AlertDialogContent>
        </AlertDialog>
    );
}
