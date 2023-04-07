import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Signin from "@/components/Signin";
import { Metadata } from "next";

type Props = {
    searchParams: {
        callbackUrl: string;
    };
};

export const metadata: Metadata = {
    title: "Signin",
    description: "sign in instantgram photos",
};

export default async function SigninPage({ searchParams: { callbackUrl } }: Props) {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    const providers = (await getProviders()) ?? {};

    return <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />;
}
