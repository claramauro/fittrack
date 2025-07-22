import { getUserByEmail } from "@/libs/database/user/queries";
import { errorHandler } from "@/libs/errorHandler";
import { loginSchema } from "@/libs/validation/authSchema";

export async function POST(req: Request) {
    const body = await req.json();
    try {
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            throw validationResult.error;
        }
        return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
    //const user = await getUserByEmail();
}
