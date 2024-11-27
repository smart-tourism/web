"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { AiFillWechat } from "react-icons/ai";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatResponse {
  answer: string;
  context: string;
  question: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async (message: string) => {
    try {
      const response = await fetch(`${process.env.chatBotUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message })
      });
      const data: ChatResponse = await response.json();
      console.log(data)
      setMessages([...messages,
      { text: data.question, isUser: true },
      { text: data.answer, isUser: false }
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96 h-[26rem] flex flex-col">
          <div className="flex justify-between items-center p-4 bg-dialogflow text-primary-foreground">
            <h2 className="text-lg font-semibold">Ajhelen Chat</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage(input);
                setInput("");
              }
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Type your message..."
              />
            </form>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-white text-white rounded-full p-3 shadow-lg cursor-pointer z-50"
          aria-label="Open chat"
        >
          <AiFillWechat className="fill-[#FE7123] text-4xl" />
        </div>
      )}
    </div>
  );
}
