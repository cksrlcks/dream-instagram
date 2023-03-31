import { SimplePost } from "@/model/post";
import PostDetail from "./PostDetail";

export default function Dialog({ post, onClose }: { post: SimplePost; onClose: () => void }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/75 z-50" onClick={onClose}>
            <div className="max-w-screen-xl bg-white mx-auto h-full flex" onClick={(e) => e.stopPropagation()}>
                <PostDetail post={post} onClose={onClose} />
            </div>
        </div>
    );
}
