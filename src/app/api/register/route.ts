import { NextRequest } from "next/server";
import { registerController } from "@/libs/server/controllers/auth/register";

export async function POST(req: NextRequest) {
    return registerController(req);
}
