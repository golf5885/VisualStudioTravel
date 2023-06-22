import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../Chat/ChatMessage";
import ChatInput from "../Cancel/ChatCancelInput";

import '../../css/ChatScreen.css';

const ChatAirport = ({ character, onTextChange }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
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
    "파리에 도착했습니다! 무엇을 할까요?",
    "알겠습니다. 예약하신 호텔로 모시겠습니다!",
  ];

  if (questionIndex === airportQuestions.length) {
    onTextChange("");
  }

  const next = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleNext = () => {
    console.log("Next button clicked");
    navigate(`/${encodeURIComponent(character)}/cancel`);
  };

  return (
    <div className="chat-screen">
      {/* 메시지 내용 */}
      {/*<div className="messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>*/}

      {/* 현재 질문 및 input */}
      {questionIndex < airportQuestions.length && (
        <div className="question" onClick={next}>
          <p>{airportQuestions[questionIndex]}</p>
            <ChatInput onSendMessage={handleSendMessage} onTextChange={handleTextChange} />
        </div>
      )}

      {/* 다음 버튼 */}
      {questionIndex === airportQuestions.length && (
        <h2 onClick={handleNext}>호텔로 이동하겠습니다!</h2>
      )}
    </div>
  );
};

export default ChatAirport;
