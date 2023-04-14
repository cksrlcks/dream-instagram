import { useCallback } from "react";
import { Comment, SimplePost } from "@/model/post";
import useSWR from "swr";
import { useCacheKey } from "@/context/CacheKeyContext";

async function updateLike(id: string, like: boolean) {
    return fetch("/api/like", {
        method: "PUT",
        body: JSON.stringify({ id, like }),
    }).then(async (res) => {
        const data = await res.json();
        console.log(data);
        return data;
    });
}

async function updateComment(postId: string, text: string) {
    return fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
            id: postId,
            text,
        }),
    }).then((res) => res.json());
}

export default function usePosts() {
    const { postsKey } = useCacheKey();
    console.log(postsKey);
    const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(postsKey);
    const setLike = useCallback(
        (post: SimplePost, username: string, like: boolean) => {
            const newPost = { ...post, likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username) };
            const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

            return mutate(updateLike(post.id, like), {
                optimisticData: newPosts,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            });
        },
        [posts, mutate]
    );

    const setComment = useCallback(
        async (post: SimplePost, comment: Comment) => {
            if (!post) return;
            const newPost = { ...post, comments: post.comments + 1 };
            const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
            return mutate(updateComment(post.id, comment.comment), {
                optimisticData: newPosts,
                populateCache: false,
                revalidate: true,
                rollbackOnError: true,
            });
        },
        [posts, mutate]
    );

    return { posts, isLoading, error, setLike, setComment, mutate };
}
