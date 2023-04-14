import { addComment } from "@/service/post";
import { withSession } from "@/util/withSession";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    return withSession(async (user) => {
        const { id, text } = await request.json();
        if (!id || text === undefined) {
            return new Response("Bad Request", { status: 400 });
        }

        return addComment(id, user.id, text)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
