import type { Metadata } from "next";
import LayoutContent from "./layout-content";
import Header from "@/ui/layout/header";
import Avatar from "@/ui/components/avatar";
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
            <Header>
                <Avatar />
            </Header>
            <div className="container">
                <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                    <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
                </div>
            </div>
            <LayoutContent>{children}</LayoutContent>
            <Footer />
        </>
    );
}
