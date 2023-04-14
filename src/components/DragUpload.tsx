import React, { useState } from "react";

export default function DragUpload({ file, setFile }: { file: File | undefined; setFile: React.Dispatch<React.SetStateAction<File | undefined>> }) {
    const [isHover, setIsHover] = useState(false);
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrag = (e: React.DragEvent) => {
        e.type === "dragenter" ? setIsHover(true) : setIsHover(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsHover(false);

        const files = e.dataTransfer?.files;

        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };

    const handleDelete = () => {
        setFile(undefined);
    };

    return (
        <>
            {file ? (
                <div className="relative h-[400px] bg-slate-100 mb-4">
                    <img src={URL.createObjectURL(file)} className="object-contain w-full h-full" />
                    <button type="button" onClick={handleDelete} className="absolute left-0 top-0 bg-black text-white py-3 px-3">
                        삭제
                    </button>
                </div>
            ) : (
                <>
                    <input id="input-file" type="file" onChange={handleFileInput} className="hidden" accept="image/*" />
                    <label
                        htmlFor="input-file"
                        onDragOver={handleDragOver}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border rounded-md border-dashed h-[200px] bg-slate-100 flex items-center justify-center mb-4 ${isHover && "bg-red-300"}`}
                    >
                        <span className="text-sm opacity-30 pointer-events-none">Drag here or click button</span>
                    </label>
                </>
            )}
        </>
    );
}
