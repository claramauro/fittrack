import { resendConfirmationEmailController } from "@/libs/server/controllers/auth/resend-confirmation-email";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return resendConfirmationEmailController(req);
}
