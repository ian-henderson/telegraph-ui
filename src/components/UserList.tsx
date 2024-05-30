import { Link } from "react-router-dom";

import { UserCircleSvg } from "../assets";
import { paths } from "../router";
import { User } from "../types";
import Icon from "./Icon";

export interface UserListProps {
    users?: User[];
}

export default function UserList({ users }: UserListProps) {
    if (!users?.length) return null;

    return users.map(UserListItem);
}

function UserListItem({ firstName, lastName, username }: User) {
    const nameString = (() => {
        if (firstName && lastName) return `${firstName} ${lastName}`;

        return firstName || lastName || null;
    })();

    return (
        <Link
            className="flex flex-row p-4"
            key={username}
            to={paths.messagePage({ username })}
        >
            <div className="mr-1 flex w-12 flex-col justify-center">
                <Icon size={35} svg={UserCircleSvg} />
            </div>

            <div className="flex flex-auto flex-col justify-center">
                <p className="font-bold">{username}</p>
                {!!nameString && <p>{nameString}</p>}
            </div>
        </Link>
    );
}
