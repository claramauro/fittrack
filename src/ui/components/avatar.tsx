import { getServerAuthSession } from "@/libs/server/nextAuth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Avatar() {
    const session = await getServerAuthSession();
    if (!session) {
        redirect("/connexion");
    }
    const user = session?.user;

    function getInitial(firstname?: string, lastname?: string) {
        if (!firstname || !lastname) {
            return "";
        }
        return `${firstname[0]}${lastname[0]}`;
    }

    return (
        <Link href={"/profil"}>
            <div className="bg-zinc-300 p-2 border shadow hover:inset-shadow-sm hover:inset-shadow-zinc-400 rounded-full text-white text-lg font-bold text-shadow-md">
                {getInitial(user?.firstname, user?.lastname)}
            </div>
        </Link>
    );
}
