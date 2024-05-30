import {
    KeyboardEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";

import { BackSvg, CloseSvg, SearchSvg } from "../assets";
import { Icon, UserList } from "../components";
import { paths } from "../router";
import { useLazySearchUserQuery } from "../services";

export default function SearchPage() {
    const [searchUsers, { data: userSearchResultsList, isLoading }] =
        useLazySearchUserQuery();

    const [searchParams, setSearchParams] = useSearchParams();
    const qUrlParam = searchParams.get("q");
    const [q, setQ] = useState<string>(qUrlParam || "");
    const [page] = useState(1);

    // focuses input when page loads
    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => searchInputRef.current?.focus(), [searchInputRef]);

    // performs search if q url param present
    useEffect(() => {
        if (qUrlParam) searchUsers({ page, q: qUrlParam || "" }, true).then();
    }, [page, qUrlParam, searchUsers]);

    const onCloseButtonClick = useCallback(
        async (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setQ("");
            const newParams = new URLSearchParams(searchParams);
            newParams.delete("q");
            setSearchParams(newParams);
            searchInputRef.current?.focus();
            await searchUsers({ page, q: "" }, true);
        },
        [
            page,
            searchInputRef,
            searchParams,
            searchUsers,
            setQ,
            setSearchParams,
        ],
    );

    // Searches on enter
    // Note: chose to use the input event instead of form because the form
    // submit triggered the close button.
    const onKeyDown = useCallback(
        async (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") return null;
            event.preventDefault();
            const cleanedQ = q.trim();
            if (cleanedQ) {
                setSearchParams({ q: cleanedQ });
            } else {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("q");
                setSearchParams(newParams);
            }
            await searchUsers({ page, q: cleanedQ }, true);
        },
        [page, q, searchParams, searchUsers, setSearchParams],
    );

    return (
        <>
            <Helmet>
                <title>Search</title>
            </Helmet>

            <nav className="navbar bg-base-100">
                <div className="mr-2 flex-none">
                    <Link
                        className="btn btn-square btn-ghost"
                        to={paths.chatPage()}
                    >
                        <Icon size={24} svg={BackSvg} />
                    </Link>
                </div>

                <div className="flex-1">
                    <div className="form-control w-full">
                        <label className="input input-bordered flex items-center gap-2 rounded-3xl">
                            <Icon size={20} svg={SearchSvg} />

                            <input
                                className="grow"
                                onChange={event => setQ(event.target.value)}
                                placeholder="Search"
                                ref={searchInputRef}
                                type="text"
                                value={q}
                                {...{ onKeyDown }}
                            />

                            {!!q.trim() && (
                                <button onClick={onCloseButtonClick}>
                                    <Icon size={20} svg={CloseSvg} />
                                </button>
                            )}
                        </label>
                    </div>
                </div>
            </nav>

            <main>
                {isLoading ? (
                    <div className="mt-12 flex flex-col items-center">
                        <span className="loading loading-ring loading-lg" />
                    </div>
                ) : (
                    <UserList users={userSearchResultsList} />
                )}
            </main>
        </>
    );
}
