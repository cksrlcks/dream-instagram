import { useCallback } from "react";
import { HomeUser } from "@/model/user";
import useSWR from "swr";

async function updateSave(postId: string, save: boolean) {
    return fetch("/api/save", {
        method: "PUT",
        body: JSON.stringify({ id: postId, save }),
    }).then((res) => res.json());
}

async function updateFollower(targetId: string, save: boolean) {
    return fetch("/api/follower", {
        method: "PUT",
        body: JSON.stringify({ id: targetId, save }),
    }).then((res) => res.json());
}

export default function useMe() {
    const { data: me, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

    const setSave = useCallback(
        (postId: string, save: boolean) => {
            if (me) {
                const newMe = { ...me, bookmarks: save ? [...me.bookmarks, postId] : me.bookmarks.filter((item) => item !== postId) };
                return mutate(updateSave(postId, save), {
                    optimisticData: newMe,
                    populateCache: false,
                    revalidate: false,
                    rollbackOnError: true,
                });
            }
        },
        [me, mutate]
    );

    const setFollower = (targetId: string, follow: boolean) => {
        return mutate(updateFollower(targetId, follow), {
            populateCache: false,
        }).then(() => mutate());
    };

    return { me, isLoading, error, setSave, setFollower };
}
