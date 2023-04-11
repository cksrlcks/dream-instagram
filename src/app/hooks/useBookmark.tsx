import { HomeUser } from "@/model/user";
import useSWR from "swr";

async function updateSave(id: string, save: boolean) {
    return fetch("/api/save", {
        method: "PUT",
        body: JSON.stringify({ id, save }),
    }).then((res) => res.json());
}

export default function useBookmark() {
    const { data: me, mutate } = useSWR<HomeUser>("/api/me");
    const setSave = (id: string, save: boolean) => {
        if (me) {
            const newMe = { ...me, bookmarks: save ? [...me.bookmarks, id] : me.bookmarks.filter((item) => item !== id) };
            return mutate(updateSave(id, save), {
                optimisticData: newMe,
                populateCache: false,
                revalidate: false,
                rollbackOnError: true,
            });
        }
    };
    return { me, setSave };
}
