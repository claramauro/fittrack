import { getMeasurements } from "@/libs/server/controllers/measurements/getMeasurements";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await getMeasurements(req);
}
