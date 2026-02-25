"use client";
import { useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Chat from "../components/Chat";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [blockedWords, setBlockedWords] = useState<string[]>(["badword"]);

  const handleSendMessage = (data: { role: string; message: string }) => {
    setMessages((prev) => [...prev, { role: data.role, text: data.message }]);
  };

  const handleAddBlockedWord = (word: string) => {
    setBlockedWords((prev) => [...prev, word.toLowerCase()]);
  };

  return (
    <div className="min-h-screen items-center bg-zinc-50 font-sans flex flex-col">
      <div className="w-full sticky bg-white border-b border-gray-200">
        <Header />
      </div>

      <div className="w-3/4 border-solid my-8 ">
        <Filter 
          onSend={handleSendMessage} 
          blockedWords={blockedWords} 
          onBlock={handleAddBlockedWord} 
        />
      </div>

      <div className="w-3/4 bg-white border rounded-xl shadow-sm p-4">
        <Chat messages={messages} />
      </div>
    </div>
  );
}