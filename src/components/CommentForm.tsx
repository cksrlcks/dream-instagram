export default function CommentForm() {
    return (
        <form className="flex items-center border-t h-[40px]">
            <div className="flex-1 h-full">
                <input type="text" placeholder="Add a comment..." className="px-4 w-full h-full focus:outline-none" />
            </div>
            <button type="button" className="basis-[60px] text-center text-[15px] font-bold text-blue-600">
                Post
            </button>
        </form>
    );
}
