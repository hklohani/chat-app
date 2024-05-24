// src/App.js
import { router, usePage, useRemember } from "@inertiajs/react";
import React from "react";

function UserList({ users }) {
    const [activeChatId, setActiveChatId] = useRemember(null);

    const openChat = (id) => {
        setActiveChatId(id);
        router.visit(`home?recipient_id=${id}`, { preserveState: true });
    };
    return (
        <ul className="list-group">
            {users.map((user) => (
                <li
                    key={user.id}
                    className={`list-group-item cursor-pointer ${
                        activeChatId === user.id ? "active" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => openChat(user.id)}
                >
                    <div className="text-lg font-medium">{user.name}</div>
                    <div className="text-gray-600">{user.email}</div>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
