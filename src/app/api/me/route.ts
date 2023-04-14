import { getUserByUsername } from "@/service/user";
import { withSession } from "@/util/withSession";
import { NextResponse } from "next/server";

export async function GET() {
    return withSession(async (user) => {
        const data = await getUserByUsername(user.username);
        return NextResponse.json(data);
    });
}
