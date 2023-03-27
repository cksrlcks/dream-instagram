"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, icon, activeIcon }: { href: string; icon: React.ReactNode; activeIcon: React.ReactNode }) {
    const path = usePathname();
    const isActive = path === href;
    return (
        <Link href={href} className={`flex flex-col items-center ${isActive}`}>
            <div className="text-2xl">{isActive ? activeIcon : icon}</div>
        </Link>
    );
}
