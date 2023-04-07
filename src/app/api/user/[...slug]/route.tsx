import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/post";
import { getUserByUsername } from "@/service/user";
import { NextResponse } from "next/server";

type Context = {
    params: {
        slug: string[];
    };
};
export async function GET(_: Request, context: Context) {
    const { slug } = context.params;
    if (!slug || !Array.isArray(slug) || slug.length < 2) {
        return new NextResponse("Bad Request", { status: 400 });
    }
    const [username, query] = slug;

    let request = getPostsOf;
    if (query == "saved") {
        request = getSavedPostsOf;
    } else if (query === "liked") {
        request = getLikedPostsOf;
    }

    const data = await request(username);
    return NextResponse.json(data);
}
