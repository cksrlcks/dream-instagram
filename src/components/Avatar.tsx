type Props = {
    image?: string | null;
    size?: "big" | "small";
    highlight?: boolean;
};
export default function Avatar({ image, size = "small", highlight = false }: Props) {
    return (
        <div className={`overflow-hidden rounded-full p-[3px] mr-2 ${highlight && "bg-gradient-to-r from-purple-500 to-pink-500"}`}>
            <figure className={`overflow-hidden rounded-full bg-white p-[2px] ${size === "big" ? "w-14 h-14" : " w-8 h-8"}`}>
                <img src={image ?? undefined} alt="" className="rounded-full overflow-hidden" />
            </figure>
        </div>
    );
}
