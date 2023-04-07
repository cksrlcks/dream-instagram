import { AuthUser } from "./user";

export type Comment = {
    username: string;
    comment: string;
    image: string;
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
};

export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
};
