import { AiFillHeart } from "react-icons/ai";

export default function LikeIcon({ className }: { className?: string }) {
    return <AiFillHeart className={className || "w-6 h-6 text-red-500"} />;
}
