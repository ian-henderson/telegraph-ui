import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { paths } from "../router";
import { RootState } from "../store";

export default function useAuthenticationRedirect() {
    const { accessToken, refreshToken } = useSelector((s: RootState) => s.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken || !refreshToken) navigate(paths.logInPage());
    }, [accessToken, navigate, refreshToken]);
}
