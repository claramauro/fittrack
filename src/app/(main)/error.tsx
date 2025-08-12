"use client";

import Button from "@/ui/components/button";
import { RotateCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h2 className="mb-8 font-bold text-2xl sm:text-4xl font-poppins">Oups, une erreur est survenue</h2>
            <p>Cliquez sur le bouton pour recharger la page.</p>
            <Button
                type="button"
                className="mt-8"
                onClick={() => {
                    console.log("reset");
                    reset();
                }}>
                <RotateCcw className="size-5" /> Réessayer
            </Button>
        </div>
    );
}
