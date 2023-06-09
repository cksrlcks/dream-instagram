"use client";
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from "./Avatar";
import Link from "next/link";
import Slider from "./Slider";
import useMe from "@/hooks/useMe";

export default function Followers() {
    const { me: data, isLoading, error } = useMe();
    const users = data?.following;
    return (
        <div className="bg-white rounded-md border border-slate-300 mb-4 py-4 px-6">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <ClipLoader color="#000" loading={isLoading} size={30} />
                </div>
            ) : (
                (!users || users.length === 0) && <p>you don&apost have following user</p>
            )}

            {users && users.length > 0 && (
                <Slider slidesPerView={"auto"} spaceBetween={30}>
                    {users.map((user) => (
                        <Link href={`/user/${user.username}`} key={user.username} className="flex flex-col items-center  text-center w-[64px]">
                            <Avatar image={user.image} size="big" highlight />
                            <span className="text-sm text-ellipsis overflow-hidden w-full">{user.username}</span>
                        </Link>
                    ))}
                </Slider>
            )}
        </div>
    );
}
