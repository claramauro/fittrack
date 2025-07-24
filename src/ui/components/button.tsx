import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";

export default function Button({
    children,
    type = "button",
    asChild,
}: {
    children: React.ReactNode;
    type?: "button" | "submit";
    asChild?: boolean;
}) {
    return (
        <ShadcnButton
            asChild={asChild ? true : false}
            className="bg-main hover:bg-main hover:opacity-80 transition-all"
            type={type}>
            {children}
        </ShadcnButton>
    );
}
