import React from "react";

const ChatMessage = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="sender">{message.sender}</div>
      <div className="text">
        {message.text}
        {message.imageUrl && <img src={message.imageUrl} alt="Message" />}
      </div>
    </div>
  );
};

export default ChatMessage;
