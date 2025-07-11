import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/layout/header";

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
            <body>
                <Header />
                <div className="container mt-[105px]">{children}</div>
            </body>
        </html>
    );
}
