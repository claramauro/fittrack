import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import { Skeleton } from "../shadcn/components/ui/skeleton";

export default function Avatar() {
    const { user, isLoading } = useUser();

    function getInitial(firstname?: string, lastname?: string) {
        if (!firstname || !lastname) {
            return "";
        }
        return `${firstname[0]}${lastname[0]}`;
    }

    if (isLoading) {
        return <Skeleton className="size-11 bg-zinc-200 rounded-full" />;
    }

    return (
        <Link href={"/profil"}>
            <div className="bg-zinc-300 p-2 border shadow hover:inset-shadow-sm hover:inset-shadow-zinc-400 rounded-full text-white text-lg font-bold text-shadow-md">
                {getInitial(user?.firstname, user?.lastname)}
            </div>
        </Link>
    );
}
