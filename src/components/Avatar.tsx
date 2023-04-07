type Props = {
    image?: string | null;
    size?: "big" | "small" | "middle" | "bigger";
    highlight?: boolean;
};
type Obj = {
    [key: string]: string;
};
const sizeClass: Obj = {
    bigger: "w-24 h-24",
    big: "w-14 h-14",
    middle: "w-10 h-10",
    small: "w-8 h-8",
};

function getSize(size: string) {
    return sizeClass[size];
}
export default function Avatar({ image, size = "small", highlight = false }: Props) {
    return (
        <div className={`overflow-hidden rounded-full p-[3px] ${highlight && "bg-gradient-to-r from-purple-500 to-pink-500"} shrink-0`}>
            <figure className={`overflow-hidden rounded-full bg-white p-[2px] ${getSize(size)}`}>
                <img src={image ?? undefined} alt="" className="rounded-full overflow-hidden object-cover w-full h-full" />
            </figure>
        </div>
    );
}
