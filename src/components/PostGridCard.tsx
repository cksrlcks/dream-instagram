"use client";
import React, { useState } from "react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import PortalModal from "./PortalModal";
import Dialog from "./Dialog";
import { signIn, useSession } from "next-auth/react";

export default function PostGridCard({ post, priority }: { post: SimplePost; priority?: boolean }) {
    const { username, userImage, image, likes, text, createdAt } = post;
    const [isDetail, setIsDetail] = useState(false);
    const { data: session } = useSession();
    const handleOpenPost = () => {
        if (!session?.user) {
            return signIn();
        }
        setIsDetail(true);
    };
    return (
        <div className="relative w-full aspect-square">
            <Image src={image} alt={`photo by ${username}`} width={500} height={500} className="object-cover w-full h-full" priority={priority} onClick={handleOpenPost} />
            {isDetail && (
                <PortalModal>
                    <Dialog post={post} onClose={() => setIsDetail(false)} />
                </PortalModal>
            )}
        </div>
    );
}
