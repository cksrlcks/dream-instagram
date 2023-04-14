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

export async function searchUsers(keyword?: string) {
    const query = keyword ? `&& (username match "${keyword}") || (name match "${keyword}")` : "";
    return client.fetch(
        `*[_type == "user" ${query}]{
            ...,
            "id": _id,
            "following": count(following),
            "followers": count(followers),
        }`
    );
}

export async function getUserForProfile(username: string) {
    return client
        .fetch(
            `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id" : _id,
            "following": count(following),
            "followers": count(followers),
            "posts" : count(*[_type == "post" && author->username == "${username}"])
        }`
        )
        .then((user) => ({ ...user, following: user?.following ?? 0, followers: user?.followers ?? 0, posts: user?.posts ?? 0 }));
}

export async function savePost(postId: string, userId: string) {
    return client
        .patch(userId)
        .setIfMissing({ bookmarks: [] })
        .append("bookmarks", [{ _ref: postId, _type: "reference" }])
        .commit({ autoGenerateArrayKeys: true });
}

export async function unSavePost(postId: string, userId: string) {
    return client
        .patch(userId)
        .unset([`bookmarks[_ref=="${postId}"]`])
        .commit({ autoGenerateArrayKeys: true });
}

export async function saveFollower(myId: string, userId: string) {
    return client
        .transaction()
        .patch(myId, (user) => user.setIfMissing({ following: [] }).append("following", [{ _ref: userId, _type: "reference" }]))
        .patch(userId, (user) => user.setIfMissing({ followers: [] }).append("followers", [{ _ref: myId, _type: "reference" }]))
        .commit({ autoGenerateArrayKeys: true });
}

export async function deleteFollower(myId: string, userId: string) {
    return client
        .transaction()
        .patch(myId, (user) => user.unset([`following[_ref=="${userId}"]`]))
        .patch(userId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
        .commit({ autoGenerateArrayKeys: true });
}
