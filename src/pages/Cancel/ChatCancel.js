import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "../Chat/ChatMessage";
import ChatCancelInput from "./ChatCancelInput";
import ChatEat from "../Chat/ChatEat";
import ChatStay from "../Chat/ChatStay";
import ChatDo from "../Chat/ChatDo";
import communicate from "../../communicate";

import "../../css/ChatScreen.css";

const ChatCancel = ({ character, onTextChange, setEat, setStay, setDo, Do }) => {
  const [messages, setMessages] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [showChatScreen, setShowChatScreen] = useState(true);
  const [chatComponent, setChatComponent] = useState(null);
  const [category, setCategory] = useState("");

  const handleSendMessage = (message) => {
    const newMessage = { sender: character, text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextChange = (text) => {
    onTextChange(text); // Call the onTextChange prop
  };

  const cancelQuestions = [
    "호텔의 예약이 취소되었습니다. 다음으로 무엇을 할까요?",
    "구체적으로 어떤 음료를 먹고 싶으신지 알려주세요",
  ];

  if (questionIndex === cancelQuestions.length) {
    onTextChange("");
  }

  const handleNext = () => {
    // const category =
    determineNextScreen(); // 다음 화면 결정
  };

  useEffect(() => {
    if (category === "food") {
      setChatComponent(
        <ChatEat
          character={character}
          onTextChange={handleTextChange}
          setEat={setEat}
        />
      );
      setShowChatScreen(false);
    } else if (category === "hotel") {
      setChatComponent(
        <ChatStay
          character={character}
          onTextChange={handleTextChange}
          setStay={setStay}
        />
      );
      setShowChatScreen(false);
    } else if (category === "attraction") {
      setChatComponent(
        <ChatDo
          character={character}
          onTextChange={handleTextChange}
          Do={Do}
          setDo={setDo}
        />
      );
      setShowChatScreen(false);
    }
  }, [category]);

  const determineNextScreen = () => {
    const text = messages[0].text;

    if (text.trim() !== "") {
      zeroShotClassification(text);
    }
  };

  const zeroShotClassification = (text) => {
    // return hotel;
    communicate.post("/what", { A: text }).then((res) => {
      console.log(1)
      setCategory(res.data.what);
    });
    // 관광지, 음식, 호텔 분류 모델 리턴
    // food, hotel, attraction 중 하나 받아옴
  };

  return (
    <div>
      {/* Hide the chat screen when showChatScreen is false */}
      {showChatScreen && (
        <div className="chat-screen">
          {/* 메시지 내용 */}
          {/*<div className="messages">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>*/}

          {/* 현재 질문 및 input */}
          {questionIndex < cancelQuestions.length && (
            <div className="question">
              <p>{cancelQuestions[questionIndex]}</p>
              <ChatCancelInput
                onSendMessage={handleSendMessage}
                onTextChange={handleTextChange}
              />
            </div>
          )}

          {questionIndex === cancelQuestions.length && (
            <h2 onClick={handleNext}>
              다음
            </h2>
          )}
        </div>
      )}

      {!showChatScreen && chatComponent && (
        <div className="chat-component">{chatComponent}</div>
      )}
    </div>
  );
};

export default ChatCancel;