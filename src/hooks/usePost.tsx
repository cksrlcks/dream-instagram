import { useCallback } from "react";
import { Comment, FullPost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

async function updateComment(postId: string, text: string) {
    return fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
            id: postId,
            text,
        }),
    }).then((res) => res.json());
}

async function updatePost(postId: string, authorId: string) {
    return fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({
            id: postId,
            authorId,
        }),
    }).then((res) => res.json());
}

export default function usePost(posdId: string) {
    const { data: post, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${posdId}`);
    const { mutate: globalMutate } = useSWRConfig();
    const setComment = useCallback(
        async (comment: Comment) => {
            if (!post) return;
            const newPost = { ...post, comments: [...post.comments, comment] };
            return mutate(updateComment(post.id, comment.comment), {
                optimisticData: newPost,
                populateCache: false,
                revalidate: true,
                rollbackOnError: true,
            }).then(() => globalMutate("/api/posts"));
        },
        [post, mutate, globalMutate]
    );

    const deletePost = useCallback(async (post: FullPost) => {
        if (!post) return;
        return mutate(updatePost(post.id, post.authorId), {
            populateCache: false,
            revalidate: false,
        }).then(() => globalMutate("/api/posts"));
    }, []);

    return { post, isLoading, error, setComment, deletePost };
}
