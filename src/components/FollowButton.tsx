"use client";
import { useTransition, useState } from "react";
import { ProfileUser } from "@/model/user";
import React from "react";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetcing, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetcing;
    const { username } = user;
    const { me: loggedInUser, setFollower } = useMe();
    const showButton = loggedInUser && loggedInUser.username !== username;
    const following = loggedInUser && loggedInUser.following.find((item) => item.username === username);
    const text = following ? "Unfollow" : "Follow";

    const handleFollow = () => {
        setIsFetching(true);
        setFollower(user.id, !following).then(() => {
            setIsFetching(false);
            startTransition(() => {
                router.refresh();
            });
        });
    };

    return (
        <>
            {showButton && (
                <div>
                    {isUpdating && (
                        <div>
                            <PulseLoader size={6} />
                        </div>
                    )}
                    {!isUpdating && <Button text={text} onClick={handleFollow} red={text === "Unfollow"} />}
                </div>
            )}
        </>
    );
}
