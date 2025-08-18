import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Button from "./button";

export default function LogoutButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Se déconnecter"
            title="Déconnexion"
            className="cursor-pointer bg-transparent hover:bg-transparent"
            onClick={() => signOut()}>
            <LogOut className="!w-6 !h-6 text-zinc-600" />
        </Button>
    );
}
