import { AuthUser } from "./user";

export type Comment = {
    username: string;
    comment: string;
    image?: string | undefined;
};

export type FullPost = {
    username: string;
    userImage: string;
    image: string;
    text: string;
    id: string;
    createdAt: string;
    likes: string[];
    comments: Comment[];
    authorId: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
};
