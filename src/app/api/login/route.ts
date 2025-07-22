import { authenticateUser } from "@/libs/auth";
import { errorHandler } from "@/libs/errors/errorHandler";
import { loginSchema } from "@/libs/validation/authSchema";

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            throw validationResult.error;
        }
        const { email, password } = validationResult.data;
        const user = await authenticateUser(email, password);
        // Générer JWT
        return new Response(JSON.stringify({ message: "Connexion réussie" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
