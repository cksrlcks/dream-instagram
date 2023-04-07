import { SearchUser } from "@/model/user";
import Avatar from "./Avatar";

export default function UserList({ data }: { data: SearchUser[] }) {
    return (
        <>
            {data?.map((user) => (
                <div key={user.username} className="flex items-center gap-3 border bg-white mb-1 py-3 px-2">
                    <Avatar image={user.image} />
                    <div>
                        <strong>{user.username}</strong>
                        <div>{user.name}</div>
                        <div>
                            {user.followers} followers · {user.following} followings
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
