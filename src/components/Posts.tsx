"use client";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostCard from "./PostCard";
import { ClipLoader } from "react-spinners";

export default function Posts() {
    const { data, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
    if (isLoading) {
        return (
            <div className="text-center">
                <ClipLoader color="#000" loading={isLoading} size={30} />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return <div className="text-center">데이터가 없습니다.</div>;
    }

    return (
        <>
            {data.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index < 2} />
            ))}
        </>
    );
}
