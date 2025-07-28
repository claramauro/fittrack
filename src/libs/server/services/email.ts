import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sendMail } from "./nodeMailer";

export async function sendConfirmationRegisterEmail(firstname: string, email: string, token: string) {
    const htmlPath = join(process.cwd(), "/src/libs/constants/mails/confirmRegister.html");
    const htmlTemplate = readFileSync(htmlPath, "utf-8");

    let html = htmlTemplate.replace("{{firstname}}", firstname);
    const confirmationUrl = `${process.env.BASE_URL}/api/confirmation-email?token=${token}`;
    html = html.replace("{{confirmationUrl}}", confirmationUrl);

    await sendMail(email, "FitTrack : finaliser votre inscription", html);
}
