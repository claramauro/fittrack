import { signOut } from "next-auth/react";
import { Button } from "../shadcn/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Se déconnecter"
            title="Déconnexion"
            className="cursor-pointer"
            onClick={() => signOut()}>
            <LogOut className="!w-6 !h-6 text-zinc-600" />
        </Button>
    );
}
