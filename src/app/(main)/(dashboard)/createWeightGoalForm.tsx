import { createWeightGoal } from "@/app/actions/weightGoalActions";
import { Input } from "@/ui/shadcn/components/ui/input";
import { Label } from "@/ui/shadcn/components/ui/label";
import clsx from "clsx";
import { useActionState } from "react";

const initialState = {
    status: "",
    message: "",
};

export default function CreateWeightGoalForm({ children }: { children: (pending: boolean) => React.ReactNode }) {
    const [state, formAction, pending] = useActionState(createWeightGoal, initialState);

    return (
        <form action={formAction}>
            <Label className="mb-4" htmlFor="targetWeight">
                Poids cible
            </Label>
            <Input
                type="number"
                name="targetWeight"
                id="targetWeight"
                placeholder="Poids cible"
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
