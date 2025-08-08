"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/libs/constants/navLinks";
import LogoutButton from "@/ui/components/logoutButton";

export default function Header({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <header className="py-6 bg-white min-h-[105px] border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
                <nav>
                    <ul className="flex flex-wrap gap-4 font-raleway font-medium text-lg">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={isActive ? "active link-underline" : "link-underline"}>
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="flex items-center gap-2">
                    {/* <Avatar /> */}
                    {children}
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
