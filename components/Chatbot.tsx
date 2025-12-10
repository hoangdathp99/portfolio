'use client'
import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "./Chatbot.css";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  functionCall?: {
    name: string;
    args: {
      url: string;
    };
  };
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    // Optimistically add user message to display immediately
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");

    // Format existing messages for Gemini API history
    const history = [...messages, newUserMessage];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: history }), // Send history
      });
      const data = await response.json();
      console.log(data);

      if (data.action) {
        const { name, url } = data.action;
        if (name === "openLink" && url) {
          console.log("opening link:", url);

          const linkMessage: Message = {
            id: messages.length + 2,
            text: `Chắc chắn rồi! Tôi sẽ mở liên kết đến: ${url}`,
            sender: "bot",
            functionCall: { name, args: { url } },
          };
          setMessages((prevMessages) => [...prevMessages, linkMessage]);
          // Open the link in a new tab
          // window.open(url);
          router.push(url);

          // After executing the function, send a tool response back to the model
          // This is crucial for the model to understand the outcome of its function call
          const toolResponseParts = [
            {
              functionResponse: {
                name: "openLink",
                response: { success: true, url: url }, // Indicate success and the URL opened
              },
            },
          ];

          // Send a follow-up request to the backend with the tool response
          const followUpResponse = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: "", // No new user message, just tool response
              toolResponse: true,
              history: [
                ...history, // Previous history
                { role: "user", parts: [{ text: newUserMessage.text }] }, // The user's last message
                {
                  role: "model",
                  parts: [{ functionCall: { name, args: { url } } }],
                }, // The model's function call
                { role: "function", parts: toolResponseParts }, // The tool's response
              ],
            }),
          });
          const followUpData = await followUpResponse.json();
          const followUpBotResponseText = followUpData.reply;
          const followUpBotMessage: Message = {
            id: messages.length + 3,
            text: followUpBotResponseText,
            sender: "bot",
          };
          // setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, followUpBotMessage]);
          // }, 1000);
        } else {
          const errorMessage: Message = {
            id: messages.length + 2,
            text: "Xin lỗi, tôi không thể thực hiện yêu cầu này.",
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } else {
        const botResponseText = data.reply;
        const newBotMessage: Message = {
          id: messages.length + 2,
          text: botResponseText,
          sender: "bot",
        };
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const chatVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, y: 50, scale: 0.8, transition: { duration: 0.2 } },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.button
        className="chatbot-toggle-button"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="chatbot-header">
              <h3>Portfolio Chatbot</h3>
              <button className="close-button" onClick={toggleChatbot}>
                X
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`message ${msg.sender}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {msg.functionCall ? (
                    <a
                      href={msg.functionCall.args.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {msg.text}
                    </a>
                  ) : (
                    msg.text
                  )}
                </motion.div>
              ))}
            </div>
            <form className="chatbot-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my portfolio..."
              />
              <button type="submit">Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
