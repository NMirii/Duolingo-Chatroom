"use client";
import { type Message } from "../app/page";

interface ChatProps {
  messages: Message[];
}

export default function Chat({ messages }: ChatProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-bold text-xl text-gray-800">Chat History</h3>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
          {messages.length} messages
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400 italic">No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`group relative p-4 rounded-2xl border transition-all ${
                msg.isBlocked
                  ? "bg-red-50 border-red-100 shadow-sm"
                  : "bg-white border-gray-100 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500 uppercase tracking-tight">
                  <span className={`${msg.role === "teacher" ? "text-blue-600" : "text-black"}`}>
                    {msg.role}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{msg.language}</span>
                  <span className="text-gray-300">•</span>
                  <span>{msg.course}</span>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">{msg.timestamp}</span>
              </div>

              <div className="text-sm leading-relaxed">
                {msg.isBlocked ? (
                  <span className="text-red-500 italic font-medium">
                    [This message was blocked for containing prohibited content]
                  </span>
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                )}
              </div>

              {msg.isBlocked && (
                <div className="mt-3 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest border border-orange-200">
                    moderation: blocked
                  </span>
                </div>
              )}

              {msg.role === "teacher" && !msg.isBlocked && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}