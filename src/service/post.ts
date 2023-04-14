import { client, builder, assetsURL } from "./sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SimplePost } from "../model/post";
const simplePostProjection = `
    ...,
    "authorId": author->_id,
    "username" : author->username,
    "userImage": author->image,
    "image" : photo,
    "likes" : likes[]->username,
    "text": comments[0].comment,
    "comments":count(comments),
    "id":_id,
    "createdAt":_createdAt
`;

export async function getPosts(username: string) {
    return client
        .fetch(
            `
        *[_type == "post" && author->username == "${username}" || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]|order(_createdAt desc){${simplePostProjection}}
    `
        )
        .then(mapPosts);
}

export async function getPost(id: string) {
    return client
        .fetch(
            `
        *[_type== "post" && _id == "${id}"][0]{
            ..., 
            "username" : author->username,
            "userImage": author->image,
            "image" : photo,
            "likes" : likes[]->usename,
            "comments" : comments[]{comment, "username" : author->username, "image" :author->image},
            "id":_id,
            "createdAt":_createdAt,
            "authorId": author->_id
        }
    `
        )
        .then((post) => ({ ...post, likes: post.likes ?? [], image: urlFor(post.image) }));
}

export function urlFor(source: SanityImageSource) {
    return builder.image(source).width(800).url();
}

export async function getPostsOf(username: string) {
    return client
        .fetch(
            `
        *[_type=="post" && author->username == "${username}"]|order(_createdAt desc){
            ${simplePostProjection}
        }
    `
        )
        .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
    return client
        .fetch(
            `
        *[_type=="post" && "${username}" in likes[]->username]|order(_createdAt desc){
            ${simplePostProjection}
        }
    `
        )
        .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
    return client
        .fetch(
            `
        *[_type=="post" && 
            _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref
        ]|order(_createdAt desc){${simplePostProjection}}
    `
        )
        .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
    return posts.map((post) => ({ ...post, likes: post.likes ?? [], image: urlFor(post.image) }));
}

export async function likePost(postId: string, userId: string) {
    return client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .append("likes", [{ _ref: userId, _type: "reference" }])
        .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
    return client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit({ autoGenerateArrayKeys: true });
}

export async function addComment(postId: string, userId: string, comment: string) {
    return client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .append("comments", [{ author: { _ref: userId, _type: "reference" }, comment }])
        .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
    return fetch(assetsURL, {
        method: "POST",
        headers: {
            "content-type": file.type,
            authorization: `Bearer ${process.env.SANITY_TOKEN}`,
        },
        body: file,
    })
        .then((res) => res.json())
        .then((result) => {
            return client.create(
                {
                    _type: "post",
                    author: { _ref: userId },
                    photo: { asset: { _ref: result.document._id } },
                    comments: [
                        {
                            comment: text,
                            author: { _ref: userId, _type: "reference" },
                        },
                    ],
                    likes: [],
                },
                { autoGenerateArrayKeys: true }
            );
        })
        .catch((err) => console.log(err));
}

export async function deletePost(postId: string) {
    return client.delete(postId);
}
