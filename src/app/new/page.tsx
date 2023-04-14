import Avatar from "@/components/Avatar";
import PostForm from "@/components/PostForm";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
        redirect("/auth/signin");
    }
    return (
        <>
            <div className="max-w-screen-sm mx-auto">
                <div className="flex items-center mb-3">
                    <Avatar image={user.image} />
                    {user.username}
                </div>
                <div className="bg-white rounded-md overflow-hidden p-5">
                    <PostForm />
                </div>
            </div>
        </>
    );
}
