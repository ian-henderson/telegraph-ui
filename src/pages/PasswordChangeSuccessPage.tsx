import { Link } from "react-router-dom";

import { GenericPage } from "../components";
import { useLoggedInRedirect } from "../hooks";
import { paths } from "../router";

export default function PasswordChangeSuccessPage() {
    useLoggedInRedirect();

    return (
        <GenericPage title="Password Changed">
            <Link className="btn btn-primary w-full" to={paths.logInPage()}>
                Go to log in page
            </Link>
        </GenericPage>
    );
}
