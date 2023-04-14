import { deleteFollower, saveFollower } from "@/service/user";
import { withSession } from "@/util/withSession";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    return withSession(async (user) => {
        const { id: targetId, save } = await request.json();
        if (!targetId || save === undefined) {
            return new Response("Bad Request", { status: 400 });
        }
        const query = save ? saveFollower : deleteFollower;
        return query(user.id, targetId)
            .then((res) => NextResponse.json(res))
            .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
    });
}
