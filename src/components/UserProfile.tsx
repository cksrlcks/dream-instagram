import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

export default function DetailUserBlock({ user }: { user: ProfileUser }) {
    const { image, name, username, followers, following, posts } = user;
    const info = [
        { title: "posts", data: posts },
        { title: "followers", data: followers },
        { title: "following", data: following },
    ];
    return (
        <div className="flex justify-center gap-4 border-b py-4 max-w-[800px] mx-auto">
            <Avatar image={image} size="bigger" />
            <div>
                <div className="flex gap-4 mb-4">
                    <h1 className="text-2xl">{username}</h1>
                    <FollowButton user={user} />
                </div>
                <ul className="flex gap-5 mb-4">
                    {info.map((item, index) => (
                        <li key={index}>
                            <span>{item.data}</span>
                            {item.title}
                        </li>
                    ))}
                </ul>
                <span className="font-bold">{name}</span>
            </div>
        </div>
    );
}
