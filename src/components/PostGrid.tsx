"use client";
import useSWR from "swr";
import { SimplePost } from "@/model/post";
import { ClipLoader } from "react-spinners";
import PostGridCard from "./PostGridCard";

type Props = {
    username: string;
    query: string;
};

export default function PostGrid({ username, query }: Props) {
    const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/user/${username}/${query}`);
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
