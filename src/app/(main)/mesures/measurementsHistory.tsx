import { Measurement } from "@/libs/types/measurement";
import { DataTable } from "./(measurementsTable)/data-table";
import { columns } from "./(measurementsTable)/columns";

export default function MeasurementsHistory({ measurements }: { measurements: Measurement[] }) {
    return (
        <div className="mt-10">
            <h2 className="font-poppins text-lg font-bold mb-4">Historique des mesures</h2>
            <DataTable columns={columns} data={measurements} />
        </div>
    );
}
