import { router } from "@inertiajs/react";
import React, { useState } from "react";

const MessageInput = ({ activeReceipentId }) => {
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }
        router.post(`/message?recipient_id=${activeReceipentId}`, { message });
        setMessage("");
    };

    return (
        <form onSubmit={sendMessage}>
            <div className="input-group">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    placeholder="Message..."
                    value={message}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
};

export default MessageInput;
