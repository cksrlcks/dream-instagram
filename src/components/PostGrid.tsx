"use client";
import { ClipLoader } from "react-spinners";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/usePosts";

type Props = {
    username: string;
    query: string;
};

export default function PostGrid() {
    const { posts, isLoading } = usePosts();
    return (
        <div className="w-full text-center">
            {isLoading && <ClipLoader />}
            <ul className="grid grid-cols-3 gap-4">
                {posts &&
                    posts.map((post, index) => (
                        <li key={post.id}>
                            <PostGridCard post={post} priority={index < 6} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
