import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";
import Link from "next/link";
const menu = [
    {
        href: "#",
        name: "About",
    },
    {
        href: "#",
        name: "Help",
    },
    {
        href: "#",
        name: "Press",
    },
    {
        href: "#",
        name: "API",
    },
    {
        href: "#",
        name: "Jobs",
    },
    {
        href: "#",
        name: "Privacy",
    },
];

export default function Sidebar({ user: { name, username, image } }: { user: AuthUser }) {
    return (
        <>
            <div className="flex gap-2 items-center mb-4">
                {image && <Avatar image={image} size="big" />}
                <div>
                    <div className="font-bold">{username}</div>
                    <div>{name}</div>
                </div>
            </div>
            <div className="mb-10">호잇호잇 내소개</div>
            <div className="flex items-center gap-1 flex-wrap">
                {menu.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <Link href={item.href} className="text-sm text-slate-60">
                            {item.name}
                        </Link>
                        {index < menu.length - 1 && <span className="w-1 h-1 inline-block rounded-full bg-slate-400"></span>}
                    </div>
                ))}
            </div>
            <div>copyright instagram</div>
        </>
    );
}
