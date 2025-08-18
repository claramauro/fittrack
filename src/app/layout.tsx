import "../styles/globals.css";
import { raleway, poppins } from "@/styles/fonts";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`min-h-screen flex flex-col ${raleway.variable} ${poppins.variable}`}>{children}</body>
        </html>
    );
}
