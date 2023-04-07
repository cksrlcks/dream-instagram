import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPost } from "@/service/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response("Authentication Error", { status: 401 });
    }

    const data = await getPost(id);
    return NextResponse.json(data);
}
