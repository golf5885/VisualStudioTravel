import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../Chat/ChatMessage";
import ChatInput from "../Chat/ChatInput";

import "../../css/ChatScreen.css";

const ChatAirport = ({ character, onTextChange }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showChatInput, setShowChatInput] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };

    // Send newMessage to the backend

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextChange = (text) => {
    onTextChange(text); // Call the onTextChange prop
  };

  const airportQuestions = [
    "공항에 도착했습니다. 다음으로 무엇을 할까요?", // 호텔로 이동하는 영상 틀기
  ];

  if (questionIndex === airportQuestions.length) {
    onTextChange("");
  }

  const handleNext = () => {
    console.log("Next button clicked");
    navigate(`/${encodeURIComponent(character)}/cancel`);
  };

  const toggleClicked = () => {
    setShowChatInput(true);
  };

  return (
    <div className="chat-screen">
      {/* 질문 또는 입력란 */}
      {questionIndex < airportQuestions.length ? (
        <div className="question">
          {showChatInput ? (
            <ChatInput onSendMessage={handleSendMessage} onTextChange={handleTextChange} />
          ) : (
            <p>{airportQuestions[questionIndex]}</p>
          )}
        </div>
      ) : null}

      {/* 다음 버튼 */}
      {questionIndex === airportQuestions.length && (
        <button onClick={handleNext}>다음</button>
      )}

      {/* Toggle 버튼 */}
      {!showChatInput && questionIndex < airportQuestions.length && (
        <span className="material-icons" onClick={toggleClicked}>
          sender
        </span>
      )}
    </div>
  );
};

export default ChatAirport;
