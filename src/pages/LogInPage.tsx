import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { EmailSvg, PasswordSvg } from "../assets";
import { genericError } from "../common";
import { GenericFormPage, Icon, TextInput } from "../components";
import { useLoggedInRedirect, useLocalStorage } from "../hooks";
import { paths } from "../router";
import { useLoginMutation } from "../services";
import { authActions } from "../store/auth";

export default function LogInPage() {
    useLoggedInRedirect();
    const dispatch = useDispatch();
    const [_accessToken, accessTokenActions] = useLocalStorage("accessToken");
    const [_refreshToken, refreshTokenActions] =
        useLocalStorage("refreshToken");
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | undefined>();
    const [login, { isLoading }] = useLoginMutation();
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            try {
                const response = await login({
                    email: emailInputRef.current!.value,
                    password: passwordInputRef.current!.value,
                });

                if (response.error) {
                    const error =
                        // @ts-ignore
                        response.error?.status === 401
                            ? "No account found with the given credentials."
                            : genericError;

                    return setError(error);
                }

                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;

                accessTokenActions.setValue(accessToken);
                refreshTokenActions.setValue(refreshToken);

                setError(undefined);
                dispatch(authActions.update({ accessToken, refreshToken }));
            } catch (error) {
                console.error(error);
                setError(genericError);
            }
        },
        [
            accessTokenActions,
            dispatch,
            emailInputRef,
            login,
            passwordInputRef,
            refreshTokenActions,
            setError,
        ],
    );

    return (
        <GenericFormPage
            {...{ error, onSubmit }}
            navLinks={[
                <Link to={paths.passwordResetPage()}>Forgot password?</Link>,
                <Link to={paths.signUpPage()}>Sign up</Link>,
            ]}
            title="Log In"
        >
            <TextInput
                disabled={isLoading}
                leadingIcon={<Icon svg={EmailSvg} />}
                placeholder="Email"
                ref={emailInputRef}
                required
                type="email"
            />

            <TextInput
                disabled={isLoading}
                leadingIcon={<Icon svg={PasswordSvg} />}
                placeholder="Password"
                ref={passwordInputRef}
                required
                type="password"
            />

            <button
                className="btn btn-primary w-full"
                disabled={isLoading}
                type="submit"
            >
                {isLoading ? (
                    <span className="loading loading-ring loading-lg" />
                ) : (
                    "Log In"
                )}
            </button>
        </GenericFormPage>
    );
}
