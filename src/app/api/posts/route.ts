import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { createPost, deletePost, getPosts } from "@/service/post";
import { withSession } from "@/util/withSession";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return withSession(async (user) => {
        const data = await getPosts(user.username);
        return NextResponse.json(data);
    });
}

export async function POST(req: NextRequest) {
    return withSession(async (user) => {
        const form = await req.formData();
        const text = form.get("text")?.toString();
        const file = form.get("file") as Blob;

        if (!text || !file) {
            return new Response("Bad Request", { status: 400 });
        }

        return createPost(user.id, text, file).then((data) => NextResponse.json(data));
    });
}

export async function DELETE(req: NextRequest) {
    return withSession(async (user) => {
        const { id, authorId } = await req.json();
        if (user.id !== authorId) {
            return new Response("본인만 지울수있어요", { status: 401 });
        }
        return deletePost(id).then((data) => NextResponse.json(data));
    });
}
