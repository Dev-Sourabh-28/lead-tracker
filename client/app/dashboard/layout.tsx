"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const links = [
        { name: "Portfolios", href: "/dashboard" },
        { name: "Projects", href: "/dashboard/projects" },
    ];

    return (
        <div className="min-h-screen flex bg-[#f5f0e8]">

            {/* Sidebar */}
            <aside className="w-64 bg-[#1a1814] flex flex-col p-8 fixed h-full">

                {/* Brand */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d6b98c]" />
                    <span className="text-[#d6b98c] text-xs tracking-widest uppercase font-light">
                        Portfolio CMS
                    </span>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`h-10 px-4 rounded-lg text-xs tracking-widest uppercase font-medium flex items-center transition-colors ${
                                pathname === link.href
                                    ? "bg-[#d6b98c]/20 text-[#d6b98c]"
                                    : "text-[#f5f0e8]/40 hover:text-[#f5f0e8]/70 hover:bg-white/5"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Footer hint */}
                <div className="mt-auto">
                    <div className="border-t border-white/10 pt-6">
                        <p className="text-[#f5f0e8]/20 text-[10px] font-light leading-relaxed tracking-wide">
                            Manage your portfolios and showcase your best work.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main content — offset by sidebar width */}
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    );
}