import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { HamburgerMenuSvg, LogOutSvg, SearchSvg } from "../assets";
import { Icon } from "../components";
import { useLocalStorage, useLoggedOutRedirect } from "../hooks";
import { paths } from "../router";
import { authActions } from "../store/auth";

export default function ChatPage() {
    useLoggedOutRedirect();

    // log out
    const dispatch = useDispatch();
    const [_accessToken, { removeValue: removeAccessToken }] =
        useLocalStorage("accessToken");
    const [_refreshToken, { removeValue: removeRefreshToken }] =
        useLocalStorage("refreshToken");
    const logOut = useCallback(() => {
        removeAccessToken();
        removeRefreshToken();
        dispatch(authActions.clear());
    }, [dispatch, removeAccessToken, removeRefreshToken]);

    // navigates to search page when search is focused
    const navigate = useNavigate();
    const onSearchFocus = useCallback(
        () => navigate(paths.searchPage()),
        [navigate],
    );

    return (
        <>
            <Helmet>
                <title>Telegraph</title>
            </Helmet>

            <nav className="navbar bg-base-100">
                <div className="dropdown mr-2 flex-none">
                    <button className="btn btn-square btn-ghost" role="button">
                        <Icon size={25} svg={HamburgerMenuSvg} />
                    </button>

                    <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                        <li>
                            <button
                                className="btn btn-outline btn-error btn-md"
                                onClick={logOut}
                            >
                                <Icon size={20} svg={LogOutSvg} /> Log out
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="flex-1">
                    <div className="form-control w-full">
                        <label className="input input-bordered flex items-center gap-2 rounded-3xl">
                            <Icon size={20} svg={SearchSvg} />

                            <input
                                className="grow"
                                onFocus={onSearchFocus}
                                placeholder="Search"
                                type="text"
                            />
                        </label>
                    </div>
                </div>
            </nav>

            <main />
        </>
    );
}
