import Link from "next/link";
import Avatar from "../components/avatar";
import { Button } from "../shadcn/components/ui/button";
import { LogOut } from "lucide-react";

export default function Header() {
    return (
        <header className="py-6 bg-white min-h-[105px] border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <nav>
                    <ul className="flex flex-wrap gap-4 font-raleway font-medium text-lg">
                        <li>
                            <Link href={"/"}>Tableau de bord</Link>
                        </li>
                        <li>
                            <Link href={"/mesures"}>Mesures</Link>
                        </li>
                        {/* <li>
                        <Link href={"/"}>Alimentation</Link>
                    </li> */}
                    </ul>
                </nav>
                <div className="flex items-center gap-2">
                    <Avatar />
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        aria-label="Se déconnecter"
                        title="Déconnexion"
                        className="cursor-pointer">
                        <LogOut className="!w-6 !h-6 text-zinc-600" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
