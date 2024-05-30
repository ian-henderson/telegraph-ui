import { FormEvent, useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { EmailSvg } from "../assets";
import { genericError } from "../common";
import { GenericFormPage, TextInput } from "../components";
import { useLoggedInRedirect } from "../hooks";
import { paths } from "../router";
import { useResetPasswordMutation } from "../services";

export default function ForgotPasswordPage() {
    useLoggedInRedirect();

    const navigate = useNavigate();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const emailInputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | undefined>();

    const [emailInputError, setEmailInputError] = useState<
        string | undefined
    >();

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            try {
                const email = emailInputRef.current!.value;
                const response = await resetPassword({ email });

                // @ts-ignore
                if (response.error?.data?.email?.length) {
                    // @ts-ignore
                    setEmailInputError(response.error.data.email[0]);
                    setError(undefined);
                    return null;
                }

                setEmailInputError(undefined);
                setError(undefined);
                navigate(paths.passwordResetEmailSentPage());
            } catch {
                setEmailInputError(undefined);
                setError(genericError);
            }
        },
        [emailInputRef, navigate, resetPassword, setEmailInputError, setError],
    );

    return (
        <GenericFormPage
            {...{ error, onSubmit }}
            navLinks={[
                <Link to={paths.logInPage()}>Log in</Link>,
                <Link to={paths.signUpPage()}>Sign up</Link>,
            ]}
            title="Password Reset"
        >
            <p className="mb-2">
                Enter your email address and we will send you instructions to
                reset your password.
            </p>

            <TextInput
                disabled={isLoading}
                error={emailInputError}
                leadingIcon={<EmailSvg />}
                placeholder="Email"
                ref={emailInputRef}
                required
                type="email"
            />

            <button
                className="btn btn-primary w-full"
                disabled={isLoading}
                type="submit"
            >
                {isLoading ? (
                    <span className="loading loading-ring loading-lg" />
                ) : (
                    "Continue"
                )}
            </button>
        </GenericFormPage>
    );
}
