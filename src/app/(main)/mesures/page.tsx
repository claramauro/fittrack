import { getServerAuthSession } from "@/libs/server/nextAuthSession";
import AddMeasuresForm from "./addMeasuresForm";
import { redirect } from "next/navigation";
import { getMeasurementsByUser } from "@/libs/server/database/measurement";
import { Measurement } from "@/libs/types/measurement";

export default async function MesuresPage() {
    const session = await getServerAuthSession();
    if (!session || !session.user) {
        redirect("/connexion");
    }
    const user = session.user;
    let measurements: Measurement[] = [];
    //let latestMeasurement: Measurement | null = null;

    try {
        measurements = await getMeasurementsByUser(user.id);
        // if (measurements.length > 0) {
        //     latestMeasurement = measurements[0];
        // }
    } catch {
        throw new Error("Une erreur est survenue, veuillez recharger la page.");
    }

    return (
        <div className="pt-10">
            <h1 className="mb-10 text-4xl font-poppins font-medium">Mes mesures</h1>
            {measurements[0] && <AddMeasuresForm latestMeasurement={measurements[0]} />}
        </div>
    );
}
