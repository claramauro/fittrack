import { NextRequest, NextResponse } from "next/server";
import { getPayloadFromCookie } from "../../services/auth";
import { getMeasurementsByUser } from "../../database/measurement";
import { errorHandler } from "../../errors/errorHandler";

export async function getMeasurements(req: NextRequest) {
    try {
        const payload = await getPayloadFromCookie(req);
        const measurements = await getMeasurementsByUser(payload.id as number);
        return NextResponse.json({ measurements });
    } catch (error) {
        return errorHandler(error);
    }
}
