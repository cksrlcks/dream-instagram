import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getPost } from "@/service/post";
import { withSession } from "@/util/withSession";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    return withSession(async (user) => {
        const data = await getPost(id);
        return NextResponse.json(data);
    });
}
