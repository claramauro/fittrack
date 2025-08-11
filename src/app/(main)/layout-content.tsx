"use client";

import { SessionProvider } from "next-auth/react";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    // const { user, isLoading: isLoadingUser, error: userError } = useUser();
    // const { measurements, error: errorMeasurements } = useMeasurement();

    // if (isLoadingUser) {
    //     return (
    //         <div className="flex flex-col min-h-screen">
    //             <Header />
    //             <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
    //                 <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
    //             </div>
    //             <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
    //                 <div className="animate-spin size-10 border-2 border-gray-500 border-t-transparent rounded-full" />
    //                 <p>Chargement...</p>
    //             </div>
    //             <Footer />
    //         </div>
    //     );
    // }

    // if (userError || errorMeasurements || !user || !measurements) {
    //     return (
    //         <div className="flex flex-col min-h-screen">
    //             <Header />
    //             <div className="mt-[calc(105px+4rem)] mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
    //                 <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
    //             </div>
    //             <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
    //                 <p>{userError ? userError : errorMeasurements}</p>
    //             </div>
    //             <Footer />
    //         </div>
    //     );
    // }

    return (
        <SessionProvider>
            <main className="container">{children}</main>
        </SessionProvider>
    );
}
