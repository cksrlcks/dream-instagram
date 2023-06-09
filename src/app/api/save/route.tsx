import { savePost, unSavePost } from "@/service/user";
import { withSession } from "@/util/withSession";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    return withSession(async (user) => {
        const { id, save } = await request.json();
        if (!id || save == undefined) {
            return new Response("Bad Request", { status: 400 });
        }

        const query = save ? savePost : unSavePost;

        return query(id, user.id)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
