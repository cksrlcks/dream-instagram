import { AiOutlineHeart } from "react-icons/ai";

export default function LikeIcon({ className }: { className?: string }) {
    return <AiOutlineHeart className={className || "w-6 h-6"} />;
}
