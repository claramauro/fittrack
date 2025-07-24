import type { Metadata } from "next";
import Header from "@/ui/layout/header";
import Image from "next/image";
import Footer from "@/ui/layout/footer";

export const metadata: Metadata = {
    title: "FitTrack",
    description: "L'application pour suivre ses objectifs de poids ",
};

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
            </div>
            <div className="container">{children}</div>
            <Footer />
        </>
    );
}
