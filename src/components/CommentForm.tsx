import { Comment } from "@/model/post";
import { useState } from "react";

export default function CommentForm({ onPostComment }: { onPostComment: (comment: string) => void }) {
    const [text, setText] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPostComment(text);
        setText("");
        //초기화
    };

    return (
        <form className="flex items-center border-t h-[40px]" onSubmit={handleSubmit}>
            <div className="flex-1 h-full">
                <input type="text" value={text} onChange={handleChange} placeholder="Add a comment..." className="px-4 w-full h-full focus:outline-none" />
            </div>
            <button className="basis-[60px] text-center text-[15px] font-bold text-blue-600 disabled:opacity-30" disabled={text.length === 0}>
                Post
            </button>
        </form>
    );
}
