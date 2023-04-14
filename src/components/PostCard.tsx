"use client";
import React, { useState } from "react";
import { Comment, SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import ActionBar from "./ActionBar";
import PortalModal from "./PortalModal";
import Dialog from "./Dialog";
import usePosts from "@/hooks/usePosts";
export default function PostCard({ post, priority }: { post: SimplePost; priority?: boolean }) {
    const { username, userImage, image, text, comments, id } = post;
    const [isDetail, setIsDetail] = useState(false);
    const { setComment, mutate } = usePosts();
    const handleComment = (comment: Comment) => {
        setComment(post, comment);
        mutate();
    };
    return (
        <>
            <div className="bg-white border border-slate-300 rounded-md mb-2 overflow-hidden">
                <div className="border-b border-slate-200 py-2 px-2 flex items-center gap-1">
                    <Avatar image={userImage} highlight size="middle" />
                    <span>{username}</span>
                </div>
                <figure className="aspect-[4/2]" onClick={() => setIsDetail(true)}>
                    <Image src={image} alt={`photo by ${username}`} width={500} height={500} className="object-cover w-full h-full" priority={priority} />
                </figure>
                <ActionBar post={post} onComment={handleComment}>
                    <div className="mb-2">
                        <span className="font-bold">{username}</span> {text}
                    </div>
                    {comments > 1 && (
                        <button onClick={() => setIsDetail(true)} className="text-sky-500 font-bold mb-1">
                            View {comments} comments
                        </button>
                    )}
                </ActionBar>
            </div>
            {isDetail && (
                <PortalModal>
                    <Dialog post={post} onClose={() => setIsDetail(false)} />
                </PortalModal>
            )}
        </>
    );
}
