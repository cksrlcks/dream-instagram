import { dislikePost, likePost } from "@/service/post";
import { withSession } from "@/util/withSession";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    return withSession(async (user) => {
        const { id, like } = await request.json();
        if (!id || like === undefined) {
            return new Response("Bad Request", { status: 400 });
        }
        const query = like ? likePost : dislikePost;

        return query(id, user.id)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
