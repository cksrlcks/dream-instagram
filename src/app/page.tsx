import Followers from "@/components/Followers";
import Posts from "@/components/Posts";
import Sidebar from "@/components/Sidebar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect("/auth/signin");
    }
    return (
        <section>
            <div className="flex">
                <div className=" flex-grow">
                    <Followers />
                    <Posts />
                </div>
                <div className="w-[260px]">
                    <Sidebar user={user} />
                </div>
            </div>
        </section>
    );
}
