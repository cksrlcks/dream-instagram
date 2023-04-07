import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { dislikePost, likePost } from "@/service/post";
import { getUserByUsername } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authentication Error", { status: 401 });
    }

    const { id, like } = await request.json();
    if (!id || like === undefined) {
        return new Response("Bad Request", { status: 400 });
    }
    const query = like ? likePost : dislikePost;

    return query(id, user.id)
        .then((res) => NextResponse.json(res))
        .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
