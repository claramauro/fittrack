import Link from "next/link";
import RegisterForm from "./registerForm";

export const metadata = {
    title: "S'inscrire | FitTrack",
};

export default function Inscription() {
    return (
        <div className="flex flex-col items-center justify-center min-[900px]:h-full gap-y-8 max-[900px]:mt-10 max-[900px]:pb-10">
            <div className="w-full">
                <h2 className="mb-6 text-center text-2xl font-bold">Inscription</h2>

                <RegisterForm />
            </div>
            <div>
                Déjà inscrit ?{" "}
                <Link href={"/connexion"} className="text-main font-semibold hover:opacity-80">
                    Se connecter
                </Link>
            </div>
        </div>
    );
}
