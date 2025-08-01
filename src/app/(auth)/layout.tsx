import type { Metadata } from "next";
import "../../styles/globals.css";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Se connecter | FitTrack",
    description: "L'application pour suivre ses objectifs de poids ",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex max-[900px]:flex-col min-h-screen h-screen">
            <div className="bg-main max-[900px]:w-full max-[900px]:h-2/5 h-full w-1/2 min-[900px]:max-w-3xl flex items-center justify-center">
                <h1 className="sr-only">FitTrack</h1>
                <div className="relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                    <Image
                        src={"/images/logo-white.png"}
                        alt=""
                        priority
                        fill
                        sizes="(max-width: 640px) 300px, 400px"
                    />
                </div>
            </div>
            <div className="max-[900px]:w-full max-[900px]:h-3/5 h-full w-1/2 flex-1">{children}</div>
        </div>
    );
}
