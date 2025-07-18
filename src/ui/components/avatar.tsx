import Link from "next/link";

export default function Avatar() {
    return (
        <Link href={"/profil"}>
            <div className="bg-zinc-300 p-2 border shadow hover:inset-shadow-sm hover:inset-shadow-zinc-400 rounded-full text-white text-lg font-bold text-shadow-md">
                CM
            </div>
        </Link>
    );
}
