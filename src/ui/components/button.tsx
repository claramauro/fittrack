import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";
import clsx from "clsx";

export default function Button({
    children,
    type = "button",
    asChild,
    disabled,
    className,
    onClick,
}: {
    children: React.ReactNode;
    type?: "button" | "submit";
    asChild?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <ShadcnButton
            asChild={asChild ? true : false}
            className={clsx("bg-main hover:bg-main hover:opacity-80 transition-all", className && className)}
            type={type}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </ShadcnButton>
    );
}
