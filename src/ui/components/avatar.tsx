import { useUser } from "@/contexts/userContext";
import Link from "next/link";
import { Skeleton } from "../shadcn/components/ui/skeleton";

export default function Avatar() {
    const { isLoading } = useUser();

    if (isLoading) {
        return <Skeleton className="size-11 bg-zinc-200 rounded-full" />;
    }

    return (
        <Link href={"/profil"}>
            <div className="bg-zinc-300 p-2 border shadow hover:inset-shadow-sm hover:inset-shadow-zinc-400 rounded-full text-white text-lg font-bold text-shadow-md">
                CM
            </div>
        </Link>
    );
}
