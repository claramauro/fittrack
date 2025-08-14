import { createWeightGoal, updateWeightGoal } from "@/app/actions/weightGoalActions";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { useActionState } from "react";

const initialState = {
    status: "",
    message: "",
};

export default function WeightGoalForm({
    children,
    isEdit,
    initialValue,
}: {
    children: (pending: boolean) => React.ReactNode;
    isEdit: boolean;
    initialValue?: string;
}) {
    const serverAction = isEdit ? updateWeightGoal : createWeightGoal;

    const [state, formAction, pending] = useActionState(serverAction, initialState);

    return (
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
                className={clsx("input", state && state.status === "error" && "input-error")}
            />
            {state && state.status === "error" && <p className="error-message mt-4">{state.message}</p>}
            {children(pending)}
        </form>
    );
}
