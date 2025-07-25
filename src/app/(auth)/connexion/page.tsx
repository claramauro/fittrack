import type { Metadata } from "next";
import LoginForm from "./loginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Se connecter | FitTrack",
};

export default function Connexion() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-y-8">
            <div className="w-full">
                <h2 className="mb-6 text-center text-2xl font-bold">Connexion</h2>
                <LoginForm />
            </div>
            <div>
                Pas encore de compte ?{" "}
                <Link href={"/inscription"} className="text-main font-semibold hover:opacity-80">
                    S&apos;inscrire
                </Link>
            </div>
        </div>
    );
}
