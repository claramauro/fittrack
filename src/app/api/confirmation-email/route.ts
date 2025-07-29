import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    console.log(token);
    // Dechiffre token et vérifier validité
    // Verifier en BDD id / email
    // Passer isVerified true
}
