import { Button as ShadcnButton } from "@/ui/shadcn/components/ui/button";

export default function Button({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
    return (
        <ShadcnButton
            asChild={asChild ? true : false}
            className="bg-main hover:bg-main hover:opacity-80 transition-all">
            {children}
        </ShadcnButton>
    );
}
