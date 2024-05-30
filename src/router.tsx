import { createBrowserRouter } from "react-router-dom";

import { createParamString } from "./common";
import {
    ChatPage,
    LogInPage,
    MessagePage,
    PasswordChangePage,
    PasswordChangeSuccessPage,
    PasswordResetEmailSentPage,
    PasswordResetPage,
    RegisterPage,
    SearchPage,
} from "./pages";

const path =
    (pathString: string) =>
    (params: { [key: string]: string } = {}) =>
        pathString + createParamString(params);

export const paths = {
    chatPage: path("/"),
    logInPage: path("/log-in"),
    messagePage: path("/message"),
    passwordChangePage: path("/password-change"),
    passwordChangeSuccessPage: path("/password-change-success"),
    passwordResetEmailSentPage: path("/password-reset-email-sent"),
    passwordResetPage: path("/password-reset"),
    searchPage: path("/search-page"),
    signUpPage: path("/sign-up"),
};

const router = createBrowserRouter([
    { path: paths.chatPage(), element: <ChatPage /> },
    { path: paths.logInPage(), element: <LogInPage /> },
    { path: paths.messagePage(), element: <MessagePage /> },
    { path: paths.passwordChangePage(), element: <PasswordChangePage /> },
    {
        path: paths.passwordChangeSuccessPage(),
        element: <PasswordChangeSuccessPage />,
    },
    {
        path: paths.passwordResetEmailSentPage(),
        element: <PasswordResetEmailSentPage />,
    },
    { path: paths.passwordResetPage(), element: <PasswordResetPage /> },
    { path: paths.searchPage(), element: <SearchPage /> },
    { path: paths.signUpPage(), element: <RegisterPage /> },
]);

export default router;
