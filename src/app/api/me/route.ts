import { me } from "@/libs/server/controllers/user/me";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return await me(req);
}
