import React from "react";
import LikeIcon from "./ui/icons/LikeIcon";
import { RxBookmark } from "react-icons/rx";
import { parseDate } from "@/app/util/date";

export default function ActionBar({ likesCount, createdAt, username, text }: { likesCount: number; createdAt: string; username: string; text: string }) {
    return (
        <div className="py-4 px-4">
            <div className="flex justify-between items-center mb-2">
                <button type="button" className="text-2xl">
                    <LikeIcon />
                </button>
                <button type="button" className="text-2xl">
                    <RxBookmark />
                </button>
            </div>
            <div className="text-sm font-bold mb-2">
                {likesCount} {likesCount > 1 ? "likes" : "like"}
            </div>
            <div className="mb-2">
                <span className="font-bold">{username}</span> {text}
            </div>
            <div className="text-sm text-slate-500 tracking-tight uppercase">{parseDate(createdAt)}</div>
        </div>
    );
}
