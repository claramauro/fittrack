"use client";

import { useUser } from "@/contexts/userContext";
import Footer from "@/ui/layout/footer";
import Header from "@/ui/layout/header";
import Image from "next/image";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { user, isLoading, error } = useUser();

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                    <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
                </div>
                <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
                    <div className="animate-spin size-10 border-2 border-gray-500 border-t-transparent rounded-full" />
                    <p>Chargement...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                    <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
                </div>
                <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
                    <p>{error}</p>
                </div>
                <Footer />
            </div>
        );
    }

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
