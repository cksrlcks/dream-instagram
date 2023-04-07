"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import LikeIcon from "./ui/icons/LikeIcon";
import PostIcon from "./ui/icons/PostIcon";
import PostGrid from "./PostGrid";

type Props = {
    user: ProfileUser;
};

const tabs = [
    { type: "posts", icon: <PostIcon /> },
    { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
    { type: "liked", icon: <LikeIcon className="w-3 h-3" /> },
];

export default function UserPosts({ user }: Props) {
    const [query, setQuery] = useState(tabs[0].type);

    return (
        <>
            <section>
                <ul className="flex justify-center gap-3  mb-4 py-4 mt-4">
                    {tabs.map(({ type, icon }) => (
                        <li key={type} onClick={() => setQuery(type)}>
                            <button className={`flex gap-1 items-center ${type == query && "font-bold"}`}>
                                {icon}
                                <span className="hidden md:inline">{type}</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <PostGrid username={user.username} query={query} />
            </section>
        </>
    );
}
