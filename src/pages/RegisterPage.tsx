import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { EmailSvg, PasswordSvg, UserSvg } from "../assets";
import { GenericFormPage, Icon, TextInput } from "../components";
import { useLoggedInRedirect, useLocalStorage } from "../hooks";
import { paths } from "../router";
import { useLoginMutation, useRegisterMutation } from "../services";
import { authActions } from "../store/auth";

const genericError = "Something went wrong.";

const MIN_PASSWORD_LENGTH = 8;

export default function RegisterPage() {
    useLoggedInRedirect();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [_accessToken, accessTokenActions] = useLocalStorage("accessToken");
    const [_refreshToken, refreshTokenActions] =
        useLocalStorage("refreshToken");

    const [login, loginState] = useLoginMutation();
    const [register, registerState] = useRegisterMutation();
    const isLoading = loginState.isLoading || registerState.isLoading;

    const [error, setError] = useState<string | undefined>();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const [emailError, setEmailError] = useState<string | undefined>();

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameError, setUsernameError] = useState<string | undefined>();

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | undefined
    >();

    interface ValidateProps {
        password: string;
        confirmPassword: string;
    }

    const validate = useCallback(
        ({ password, confirmPassword }: ValidateProps) => {
            if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
                return false;
            }

            setConfirmPasswordError(undefined);

            return true;
        },
        [setConfirmPasswordError],
    );

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            const email = emailInputRef.current!.value;
            const username = usernameInputRef.current!.value;
            const password = passwordInputRef.current!.value;
            const confirmPassword = confirmPasswordInputRef.current!.value;

            if (!validate({ confirmPassword, password })) return null;

            // registers user
            try {
                const registerResponse = await register({
                    email,
                    password,
                    username,
                });

                if (registerResponse.error) {
                    // @ts-ignore
                    if (registerResponse.error.data?.email?.length)
                        // @ts-ignore
                        setEmailError(registerResponse.error.data.email[0]);

                    // @ts-ignore
                    if (registerResponse.error.data?.username?.length)
                        setUsernameError(
                            // @ts-ignore
                            registerResponse.error.data.username[0],
                        );

                    return null;
                }

                // clear error states
                setConfirmPasswordError(undefined);
                setEmailError(undefined);
                setError(undefined);
                setUsernameError(undefined);
            } catch {
                setError(genericError);
                return null;
            }

            // attempts to log in - redirects to log in page if log in fails
            try {
                const loginResponse = await login({ email, password });

                if (loginResponse.error)
                    throw new Error(
                        "There was a problem programatically logging in. Redirecting user to the Log In page.",
                    );

                const accessToken = loginResponse.data.access;
                const refreshToken = loginResponse.data.refresh;
                dispatch(authActions.update({ accessToken, refreshToken }));
                accessTokenActions.setValue(accessToken);
                refreshTokenActions.setValue(refreshToken);
            } catch {
                navigate(paths.logInPage());
            }
        },
        [
            accessTokenActions,
            confirmPasswordInputRef,
            dispatch,
            emailInputRef,
            login,
            navigate,
            passwordInputRef,
            refreshTokenActions,
            register,
            setConfirmPasswordError,
            setEmailError,
            setError,
            setUsernameError,
            usernameInputRef,
            validate,
        ],
    );

    return (
        <GenericFormPage
            {...{ error, onSubmit }}
            navLinks={[<Link to={paths.logInPage()}>Log in</Link>]}
            title="Sign Up"
        >
            <TextInput
                disabled={isLoading}
                error={emailError}
                leadingIcon={<Icon svg={EmailSvg} />}
                placeholder="Email"
                ref={emailInputRef}
                required
                type="email"
            />

            <TextInput
                disabled={isLoading}
                error={usernameError}
                leadingIcon={<Icon svg={UserSvg} />}
                placeholder="Username"
                ref={usernameInputRef}
                required
                type="text"
            />

            <TextInput
                disabled={isLoading}
                leadingIcon={<Icon svg={PasswordSvg} />}
                minLength={MIN_PASSWORD_LENGTH}
                placeholder="Password"
                ref={passwordInputRef}
                required
                type="password"
            />

            <TextInput
                disabled={isLoading}
                error={confirmPasswordError}
                leadingIcon={<Icon svg={PasswordSvg} />}
                minLength={MIN_PASSWORD_LENGTH}
                placeholder="Confirm Password"
                ref={confirmPasswordInputRef}
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
                    "Sign Up"
                )}
            </button>
        </GenericFormPage>
    );
}
