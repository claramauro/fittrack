import { confirmationEmailController } from "@/libs/server/controllers/auth/confirmation-email";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return confirmationEmailController(req);
}
