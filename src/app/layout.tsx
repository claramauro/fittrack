import "../styles/globals.css";
import { raleway, poppins } from "@/styles/fonts";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${raleway.variable} ${poppins.variable}`}>{children}</body>
        </html>
    );
}
