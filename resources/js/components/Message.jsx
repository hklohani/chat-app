import React from "react";

const Message = ({ message, activeReceipentId }) => {
    return (
        <div
            className={`row ${
                activeReceipentId == message.recipient_id
                    ? "justify-content-end"
                    : ""
            }`}
        >
            <div className="col-md-6">
                <small className="text-muted float-right">
                    {message?.sender?.name} | {message.time}
                </small>
                <small className="text-muted">{message.name}</small>
                <div
                    className={`alert alert-${
                        activeReceipentId == message.recipient_id
                            ? "primary"
                            : "secondary"
                    }`}
                    role="alert"
                >
                    {message.message}
                </div>
            </div>
        </div>
    );
};

export default Message;
