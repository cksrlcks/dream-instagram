"use client";
import React, { useState, useEffect } from "react";
import LikeIcon from "./ui/icons/LikeIcon";
import LikeFillIcon from "./ui/icons/LikeFillIcon";
import { parseDate } from "@/app/util/date";
import { useSession } from "next-auth/react";
import ToggleButton from "./ui/ToggleButton";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import useSWR, { useSWRConfig } from "swr";
import { SimplePost } from "@/model/post";

export default function ActionBar({ post }: { post: SimplePost }) {
    const { username, userImage, image, text, createdAt, id, likes } = post;
    const { data: me } = useSWR("/api/me");
    const { mutate } = useSWRConfig();
    const { data: session } = useSession();
    const user = session?.user;
    const liked = user ? likes?.includes(user.username) : false;
    const saved = me ? me.bookmarks.includes(id) : false;

    const handleLike = (like: boolean) => {
        fetch("/api/like", {
            method: "PUT",
            body: JSON.stringify({ id, like }),
        }).then((res) => {
            mutate("/api/posts");
        });
    };

    const handleSave = (save: boolean) => {
        fetch("/api/save", {
            method: "PUT",
            body: JSON.stringify({ id, save }),
        }).then((res) => {
            mutate("/api/me");
        });
    };

    return (
        <div className="py-4 px-4">
            <div className="flex justify-between items-center mb-2">
                <ToggleButton toggled={liked} onToggle={handleLike} onIcon={<LikeFillIcon />} offIcon={<LikeIcon />} />
                <ToggleButton toggled={saved} onToggle={handleSave} onIcon={<BookmarkFillIcon />} offIcon={<BookmarkIcon />} />
            </div>
            <div className="text-sm font-bold mb-2">{likes.length > 1 ? "likes" : "like"}</div>
            <div className="mb-2">
                <span className="font-bold">{username}</span> {text}
            </div>
            <div className="text-sm text-slate-500 tracking-tight uppercase">{parseDate(createdAt)}</div>
        </div>
    );
}
