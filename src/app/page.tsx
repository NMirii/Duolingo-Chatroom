"use client";
import { useState } from "react";
import Header from "../components/Header";
import Filter from "../components/Filter";
import Chat from "../components/Chat";
import { type ChatFormData } from "../schemas/chatSchema";

export interface Message extends ChatFormData {
  timestamp: string;
  isBlocked: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [blockedWords, setBlockedWords] = useState<string[]>(["badword", "sa"]);

  const handleSendMessage = (data: Message) => {
    setMessages((prev) => [...prev, data]);
  };

  const handleAddBlockedWord = (word: string) => {
    if (word.trim() === "") return;
    const newWord = word.toLowerCase();

    setBlockedWords((prev) => {
      if (prev.includes(newWord)) return prev;
      return [...prev, newWord];
    });

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.role !== "student") return msg;
        const wordsInMessage = msg.message.toLowerCase().split(/\s+/);
        const shouldBlock = wordsInMessage.includes(newWord);
        if (shouldBlock) return { ...msg, isBlocked: true };
        return msg;
      })
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans flex flex-col items-center">
      <div className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">
        <Header />
      </div>

      <div className="w-full max-w-4xl my-8 px-4">
        <Filter
          onSend={handleSendMessage}
          blockedWords={blockedWords}
          onBlock={handleAddBlockedWord}
        />
      </div>

      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-12">
        <Chat messages={messages} />
      </div>
    </div>
  );
}