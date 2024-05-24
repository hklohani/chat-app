import React from "react";
import ChatBox from "../components/ChatBox";

const Home = ({ users, messages, activeReceipentId }) => {
    return (
        <ChatBox
            users={users}
            messages={messages}
            activeReceipentId={activeReceipentId}
        />
    );
};

export default Home;
