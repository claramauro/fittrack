import type { Metadata } from "next";
import LoginForm from "./loginForm";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Se connecter | FitTrack",
};

export default function Connexion() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-y-8">
            <LoginForm />
            <div>
                Pas encore de compte ?{" "}
                <Link href={"/inscription"} className="text-main font-semibold hover:opacity-80">
                    S&apos;inscrire
                </Link>
            </div>
        </div>
    );
}
