import { client } from "./sanity";

type OAuthUser = {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    username: string;
};

export async function createUser({ id, name, email, image, username }: OAuthUser) {
    const result = await client.createIfNotExists({
        _id: id,
        _type: "user",
        username,
        email,
        name,
        image,
        following: [],
        followers: [],
        bookmarks: [],
    });
    return result;
}

export async function getUserByUsername(username: string) {
    return client.fetch(
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id": _id,
            following[]->{username, image},
            followers[]->{username, image},
            "bookmarks": bookmarks[]->_id
        }`
    );
}
