import Search from "@/components/Search";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "User Search",
    description: "Search Users",
};

export default async function SearchPage() {
    return <Search />;
}
