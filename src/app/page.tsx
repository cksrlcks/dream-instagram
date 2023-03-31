import FollowingBar from "@/components/FollowingBar";
import Posts from "@/components/Posts";
import Sidebar from "@/components/Sidebar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    //SSR
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect("/auth/signin");
    }
    return (
        <section>
            <div className="flex gap-10">
                <div className="flex-grow min-w-0">
                    <FollowingBar />
                    <Posts />
                </div>
                <div className="w-[320px]">
                    <Sidebar user={user} />
                </div>
            </div>
        </section>
    );
}
