import useSWR from "swr";
import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import Avatar from "./Avatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import CloseIcon from "./ui/icons/CloseIcon";
import { ClipLoader } from "react-spinners";

export default function PostDetail({ post, onClose }: { post: SimplePost; onClose: () => void }) {
    const { username, userImage, image, text, createdAt, id, likes } = post;
    const likesCount = likes ? likes.length : 0;
    const { data, isLoading } = useSWR<FullPost>(`/api/posts/${id}`);
    const comments = data?.comments;
    return (
        <>
            <div className="basis-2/3 bg-slate-100 ">
                <div className="w-full h-full">
                    <Image src={image} alt={`photo by ${username}`} width={500} height={500} className="object-contain w-full h-full" priority />
                </div>
            </div>
            <div className="basis-1/3 flex flex-col">
                <div className="text-right text-xl px-1 pt-2">
                    <button onClick={onClose} className="w-[30px] h-[30px] inline-flex items-center justify-center">
                        <CloseIcon />
                    </button>
                </div>
                <div className="border-b border-slate-200 py-2 px-4 flex items-center gap-1">
                    <Avatar image={userImage} highlight size="middle" />
                    <span>{username}</span>
                </div>
                <div></div>
                <div className="flex-1 py-2 px-4 ">
                    {isLoading ? (
                        <div className="text-center">
                            <ClipLoader color="#000" loading={isLoading} size={30} />
                        </div>
                    ) : (
                        comments?.map((item, index) => (
                            <div className="flex gap-2" key={index}>
                                <Avatar image={item.image} />
                                <div className="pt-2">
                                    <span className="font-bold mr-1">{item.username}</span>
                                    {item.comment}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <ActionBar post={post} />
                <CommentForm />
            </div>
        </>
    );
}
