"use client";
import { useState, useRef } from "react";
import DragUpload from "./DragUpload";
import { useRouter } from "next/navigation";

export default function PostForm() {
    const router = useRouter();
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [file, setFile] = useState<File>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !textRef.current?.value) return;
        setIsLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("text", textRef.current?.value ?? "");
        fetch("/api/posts", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (!res.ok) {
                    setError(`${res.status} ${res.statusText}`);
                }
                router.push("/");
            })
            .catch((err) => {
                setError(err.toString());
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            {isLoading ? (
                <div className="text-center py-4">포스트를 저장중입니다</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <DragUpload file={file} setFile={setFile} />

                    <div className="h-[100px]">
                        <textarea ref={textRef} className="resize-none w-full h-full border-none focus:outline-none" placeholder="내용을 입력해주세요"></textarea>
                    </div>
                    <div className="text-right">
                        <button className="bg-sky-500 font-bold text-white py-2 px-4 rounded-md">Publish</button>
                    </div>
                </form>
            )}
        </>
    );
}
