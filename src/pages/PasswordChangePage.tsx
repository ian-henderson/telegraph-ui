import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { PasswordSvg } from "../assets";
import { genericError } from "../common";
import { GenericFormPage, GenericPage, TextInput } from "../components";
import { useLoggedInRedirect } from "../hooks";
import { paths } from "../router";
import {
    useChangePasswordMutation,
    useVerifyPasswordResetTokenMutation,
} from "../services";

const MINIMUM_PASSWORD_LENGTH = 8;

export default function PasswordChangePage() {
    useLoggedInRedirect();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>();

    const [changePassword, changePasswordState] = useChangePasswordMutation();

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const [verifyPasswordResetToken, verifyPasswordResetTokenState] =
        useVerifyPasswordResetTokenMutation();

    const [tokenIsValid, setTokenIsValid] = useState<boolean | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!token?.trim()) return undefined;
        (async () => {
            const response = await verifyPasswordResetToken({ token });

            // @ts-ignore
            if (response?.error?.status === 400) {
                setTokenIsValid(false);
                return null;
            }

            setTokenIsValid(true);
        })();
    }, [setTokenIsValid, token, verifyPasswordResetToken]);

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            if (!token?.trim()) return undefined;

            const password = passwordInputRef.current!.value;
            const confirmPassword = confirmPasswordInputRef.current!.value;

            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return undefined;
            }

            try {
                const response = await changePassword({ password, token });

                if (response?.error) {
                    setError(genericError);
                    return null;
                }

                setError(undefined);
                navigate(paths.passwordChangeSuccessPage());
            } catch {
                setError(genericError);
            }
        },
        [
            changePassword,
            confirmPasswordInputRef,
            navigate,
            passwordInputRef,
            setError,
            token,
        ],
    );

    if (!token?.trim())
        return (
            <GenericPage title="Missing Token">
                <p className="mb-2">
                    Password Reset token is missing from this page. Trying
                    sending another password reset email.
                </p>

                <Link
                    className="btn btn-primary w-full"
                    to={paths.passwordResetPage()}
                >
                    Reset Password
                </Link>
            </GenericPage>
        );

    if (tokenIsValid === false)
        return (
            <GenericPage title="Invalid Token">
                <p className="mb-2">
                    Password Reset token is invalid. Try sending another
                    password reset email.
                </p>

                <Link
                    className="btn btn-primary w-full"
                    to={paths.passwordResetPage()}
                >
                    Reset Password
                </Link>
            </GenericPage>
        );

    function TokenMessage() {
        if (verifyPasswordResetTokenState.isLoading)
            return <p className="text-info">Verifying token... </p>;

        if (verifyPasswordResetTokenState.status === "fulfilled")
            return <p className="text-success">Token is valid.</p>;

        if (verifyPasswordResetTokenState.status === "rejected")
            return <p className="text-error">Error verifying token.</p>;

        return null;
    }

    return (
        <GenericFormPage
            {...{ error, onSubmit }}
            navLinks={[
                <Link to={paths.logInPage()}>Log in</Link>,
                <Link to={paths.signUpPage()}>Sign up</Link>,
            ]}
            title="New Password"
        >
            <TokenMessage />

            <p className="mb-2">Password must contain at least 8 characters.</p>

            <TextInput
                disabled={changePasswordState.isLoading}
                leadingIcon={<PasswordSvg />}
                minLength={MINIMUM_PASSWORD_LENGTH}
                placeholder="New Password"
                ref={passwordInputRef}
                required
                type="password"
            />

            <TextInput
                disabled={changePasswordState.isLoading}
                leadingIcon={<PasswordSvg />}
                minLength={MINIMUM_PASSWORD_LENGTH}
                placeholder="Confirm New Password"
                ref={confirmPasswordInputRef}
                required
                type="password"
            />

            <button
                className="btn btn-primary w-full"
                disabled={changePasswordState.isLoading}
                type="submit"
            >
                {changePasswordState.isLoading ? (
                    <span className="loading loading-ring loading-lg" />
                ) : (
                    "Reset Password"
                )}
            </button>
        </GenericFormPage>
    );
}
