import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";
import UserList from "./UserList.jsx";

const ChatBox = ({ users, messages, activeReceipentId }) => {
    const webSocketChannel = `chat-received`;

    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel).listen(
            "got-message",
            async (e) => {
                console.log(e);
                setTimeout(scrollToBottom, 0);
            }
        );
    };

    useEffect(() => {
        connectWebSocket();

        return () => {
            window.Echo.leave(webSocketChannel);
        };
    }, []);

    return (
        <div className="row justify-content-center p-4">
            <div className="col-md-4">
                <UserList users={users} />
            </div>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div
                        className="card-body"
                        style={{ height: "500px", overflowY: "auto" }}
                    >
                        {messages?.map((message) => (
                            <Message
                                key={message.id}
                                activeReceipentId={activeReceipentId}
                                message={message}
                            />
                        ))}
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput activeReceipentId={activeReceipentId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
