import type { Metadata } from "next";
import UserProvider from "@/contexts/userContext";
import LayoutContent from "./layout-content";

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
        <UserProvider>
            <LayoutContent>{children}</LayoutContent>
        </UserProvider>
    );
}
