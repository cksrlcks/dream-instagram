import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { keyword } }: { params: { keyword: string } }) {
    const data = await searchUsers(keyword);
    return NextResponse.json(data);
}
