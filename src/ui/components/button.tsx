import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";
import clsx from "clsx";

export default function Button({
    children,
    type = "button",
    asChild,
    disabled,
    className,
    outline,
    onClick,
}: {
    children: React.ReactNode;
    type?: "button" | "submit";
    asChild?: boolean;
    disabled?: boolean;
    className?: string;
    outline?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <ShadcnButton
            asChild={asChild ? true : false}
            className={clsx(
                "bg-main hover:bg-main hover:cursor-pointer hover:opacity-80 transition-all",
                className && className,
                outline && "bg-transparent hover:bg-transparent"
            )}
            type={type}
            disabled={disabled}
            variant={outline ? "outline" : "default"}
            onClick={onClick}>
            {children}
        </ShadcnButton>
    );
}
