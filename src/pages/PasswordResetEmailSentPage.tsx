import { Link } from "react-router-dom";

import { GenericPage } from "../components";
import { useLoggedInRedirect } from "../hooks";
import { paths } from "../router";

export default function PasswordResetEmailSentPage() {
    useLoggedInRedirect();

    return (
        <GenericPage title="Email Sent">
            <p className="mb-2">
                Check your email and open the link we sent to continue.
            </p>

            <Link className="btn btn-neutral w-full" to={paths.logInPage()}>
                Back to log in
            </Link>
        </GenericPage>
    );
}
