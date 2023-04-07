import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const data = await searchUsers();
    return NextResponse.json(data);
}
