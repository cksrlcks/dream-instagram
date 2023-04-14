import LikeIcon from "./ui/icons/LikeIcon";
import LikeFillIcon from "./ui/icons/LikeFillIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";
import CommentForm from "./CommentForm";

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
    const { createdAt, id, likes } = post;
    const { me: user, setSave } = useMe();
    const { setLike } = usePosts();

    const liked = user ? likes?.includes(user.username) : false;
    const saved = user ? user.bookmarks.includes(id) : false;

    const handleLike = (like: boolean) => {
        user && setLike(post, user.username, like);
    };

    const handleSave = (save: boolean) => {
        user && setSave(post.id, save);
    };

    const handleComment = (comment: string) => {
        user &&
            onComment({
                username: user.username,
                image: user.image,
                comment: comment,
            });
    };

    return (
        <>
            <div className="py-4 px-4">
                <div className="flex justify-between items-center mb-2">
                    <ToggleButton toggled={liked} onToggle={handleLike} onIcon={<LikeFillIcon />} offIcon={<LikeIcon />} />
                    <ToggleButton toggled={saved} onToggle={handleSave} onIcon={<BookmarkFillIcon />} offIcon={<BookmarkIcon />} />
                </div>
                <div className="text-sm font-bold mb-2">
                    {likes.length}
                    {likes.length > 1 ? "likes" : "like"}
                </div>
                {children}
                <div className="text-sm text-slate-500 tracking-tight uppercase">{parseDate(createdAt)}</div>
            </div>
            <CommentForm onPostComment={handleComment} />
        </>
    );
}
