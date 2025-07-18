import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/layout/header";
import Image from "next/image";

export const metadata: Metadata = {
    title: "fittrack",
    description: "L'application pour suivre ses objectifs de poids ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="mb-10">
                <Header />
                <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                    <Image src={"/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
                </div>
                <div className="container">{children}</div>
            </body>
        </html>
    );
}
