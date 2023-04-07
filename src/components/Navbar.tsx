"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import Avatar from "./Avatar";
import ColorButton from "./ui/ColorButton";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import HomeIcon from "./ui/icons/HomeIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";

const menu = [
    {
        href: "/",
        icon: <HomeIcon />,
        activeIcon: <HomeFillIcon />,
    },
    {
        href: "/search",
        icon: <SearchIcon />,
        activeIcon: <SearchFillIcon />,
    },
    {
        href: "/new",
        icon: <NewIcon />,
        activeIcon: <NewFillIcon />,
    },
];

export default function Header() {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <header className="border-b sticy top-0 h-[60px] bg-white">
            <div className="flex justify-end items-center max-w-screen-xl h-full mx-auto px-4">
                <h1 className="flex-none mr-auto">
                    <Link href="/" className="font-bold">
                        Instantgram
                    </Link>
                </h1>
                <nav className="flex items-center gap-4 mr-4">
                    {menu.map((item) => (
                        <ActiveLink key={item.href} href={item.href} icon={item.icon} activeIcon={item.activeIcon} />
                    ))}
                </nav>
                {session ? (
                    <>
                        <Link href={`/user/${session.user.username}`} className="overflow-hidden rounded-full mr-3">
                            <Avatar image={session.user.image} highlight={true} />
                        </Link>
                        <ColorButton text="Sign Out" onClick={() => signOut()} />
                    </>
                ) : (
                    <ColorButton text="Sign In" onClick={() => signIn()} />
                )}
            </div>
        </header>
    );
}
