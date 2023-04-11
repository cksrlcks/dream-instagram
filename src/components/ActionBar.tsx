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
import usePosts from "@/app/hooks/usePosts";
import useBookmark from "@/app/hooks/useBookmark";

export default function ActionBar({ post }: { post: SimplePost }) {
    const { username, userImage, image, text, createdAt, id, likes } = post;

    const { data: session } = useSession();
    const user = session?.user;
    const liked = user ? likes?.includes(user.username) : false;
    const { setLike } = usePosts();

    const { me, setSave } = useBookmark();
    const saved = me ? me.bookmarks.includes(id) : false;

    const handleLike = (like: boolean) => {
        if (user) {
            setLike(post, user.username, like);
        }
    };

    const handleSave = (save: boolean) => {
        if (user) {
            setSave(post.id, save);
        }
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
