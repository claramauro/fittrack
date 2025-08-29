import Button from "@/ui/components/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-10 mx-auto relative sm:w-[400px] w-[300px] h-[85px] sm:h-[110px]">
                <Image src={"/images/logo.png"} alt="" priority fill sizes="(max-width: 640px) 300px, 400px" />
            </div>
            <h2 className="mb-8 font-bold text-2xl sm:text-4xl font-poppins">Page non trouvée</h2>
            <p>La page demandée n'existe pas.</p>
            <Button type="button" className="mt-8" asChild>
                <Link href="/">Retour tableau de bord</Link>
            </Button>
        </div>
    );
}
