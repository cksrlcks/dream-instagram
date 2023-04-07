import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { savePost, unSavePost } from "@/service/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authentication Error", { status: 401 });
    }

    const { id, save } = await request.json();
    if (!id || save == undefined) {
        return new Response("Bad Request", { status: 400 });
    }

    const query = save ? savePost : unSavePost;

    return query(id, user.id)
        .then((res) => NextResponse.json(res))
        .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
