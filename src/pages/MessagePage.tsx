import { Helmet } from "react-helmet";

// search params will be room_id and a list of usernames, room_id should be given
// priority
export default function MessagePage() {
    return (
        <>
            <Helmet>
                <title>(user name)</title>
            </Helmet>

            <nav className="navbar bg-base-100"></nav>

            <main />
        </>
    );
}
