export default function Avatar({ image }: { image?: string | null }) {
    return (
        <figure className="overflow-hidden rounded-full mr-3 w-8 h-8">
            <img src={image ?? undefined} alt="" className="object-fill" />
        </figure>
    );
}
