import * as nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null;

async function createTransporter() {
    if (cachedTransporter) {
        return cachedTransporter;
    }
    let transporter;
    if (process.env.NODE_ENV === "development") {
        const account = await nodemailer.createTestAccount();
        transporter = await nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
    } else if (process.env.NODE_ENV === "production") {
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }
    if (!transporter) {
        throw new Error("Envoi d'email impossible : transporteur non défini");
    }
    try {
        await transporter?.verify();
        console.log("Serveur prêt");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Erreur inconnue";
        throw new Error(`Erreur de configuration email: ${message}`);
    }
    cachedTransporter = transporter;
    return transporter;
}

export async function sendMail(email: string, subject: string, html: string) {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
        from: "FitTrack",
        to: email,
        subject,
        html,
    });
    console.log("Preview Email:" + nodemailer.getTestMessageUrl(info));
}
