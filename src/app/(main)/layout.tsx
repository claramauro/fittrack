import type { Metadata } from "next";
import UserProvider from "@/contexts/userContext";
import LayoutContent from "./layout-content";
import MeasurementProvider from "@/contexts/measurementContext";

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
            <MeasurementProvider>
                <LayoutContent>{children}</LayoutContent>
            </MeasurementProvider>
        </UserProvider>
    );
}
