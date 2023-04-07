"use client";

import { HomeUser, SearchUser } from "@/model/user";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import useSWR from "swr";
import { useState } from "react";
import useDebounce from "@/app/hooks/useDebounce";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const debouncedKeyword = useDebounce(keyword);
    const { data, isLoading } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
    const onChange = (keyword: string) => {
        setKeyword(keyword);
    };
    return (
        <>
            <SearchBar keyword={keyword} onChange={onChange} />
            {isLoading ? <>로딩중</> : <UserList data={data || []} />}
        </>
    );
}
