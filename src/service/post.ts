import { client, builder } from "./sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SimplePost } from "../model/post";
const simplePostProjection = `
    ...,
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
        .then((posts: SimplePost[]) => posts.map((post) => ({ ...post, image: urlFor(post.image) })));
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
            "createdAt":_createdAt
        }
    `
        )
        .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export function urlFor(source: SanityImageSource) {
    return builder.image(source).width(800).url();
}
