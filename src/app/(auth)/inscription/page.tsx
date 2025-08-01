import Link from "next/link";
import RegisterForm from "./registerForm";

export const metadata = {
    title: "S'inscrire | FitTrack",
};

export default function Inscription() {
    return (
        <div className="flex flex-col items-center justify-center min-[900px]:min-h-screen gap-y-6 py-10">
            <h2 className="text-center text-2xl font-bold">Inscription</h2>

            <RegisterForm />

            <div className="text-center">
                Déjà inscrit ?{" "}
                <Link href={"/connexion"} className="text-main font-semibold hover:opacity-80">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
