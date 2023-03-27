type Props = {
    text: string;
    onClick: () => void;
    size?: "small" | "big";
};
export default function ColorButton({ text, onClick, size = "small" }: Props) {
    return (
        <button
            onClick={onClick}
            className={`rounded-md bg-red-400 py-1 px-4 ${
                size === "big" ? "p-4 text-2xl" : ""
            }`}
        >
            {text}
        </button>
    );
}
