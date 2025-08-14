import { cn } from "@/libs/utils";
import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";

type ButtonProps = React.ComponentProps<typeof ShadcnButton>;

export default function Button({ className, ...props }: ButtonProps) {
    return (
        <ShadcnButton
            {...props}
            className={cn("bg-main hover:bg-main hover:cursor-pointer hover:opacity-80 transition-all", className)}
        />
    );
}
