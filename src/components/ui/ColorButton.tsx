type Props = {
    text: string;
    onClick: () => void;
};
export default function ColorButton({ text, onClick }: Props) {
    return (
        <button onClick={onClick} className="rounded-md bg-red-400 py-1 px-4">
            {text}
        </button>
    );
}
