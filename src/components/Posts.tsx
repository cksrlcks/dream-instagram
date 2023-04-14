"use client";
import PostCard from "./PostCard";
import { ClipLoader } from "react-spinners";
import usePosts from "@/hooks/usePosts";

export default function Posts() {
    const { posts, isLoading, error } = usePosts();
    if (isLoading) {
        return (
            <div className="text-center">
                <ClipLoader color="#000" loading={isLoading} size={30} />
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return <div className="text-center">데이터가 없습니다.</div>;
    }

    return (
        <>
            {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index < 2} />
            ))}
        </>
    );
}
