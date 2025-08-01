import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";

export default function Button({
    children,
    type = "button",
    asChild,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    type?: "button" | "submit";
    asChild?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <ShadcnButton
            asChild={asChild ? true : false}
            className="bg-main hover:bg-main hover:opacity-80 transition-all"
            type={type}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </ShadcnButton>
    );
}
