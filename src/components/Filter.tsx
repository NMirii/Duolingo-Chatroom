"use client";
import { useState } from "react";
import { chatSchema } from "../schemas/chatSchema";

export default function Filter({ onSend, blockedWords, onBlock }: any) {
  const [course, setCourse] = useState("Spanish");
  const [language, setLanguage] = useState("en");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [newWord, setNewWord] = useState("");

  const handleSend = () => {
    const result = chatSchema.safeParse({ course, language, role, message });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    const isBlocked = blockedWords.some((word: string) => {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      return regex.test(message);
    });

    if (role === "student" && isBlocked) {
      alert("This message contains prohibited words!");
      return;
    }

    onSend({
      role,
      message,
      course,
      language,
      timestamp: new Date().toLocaleTimeString(),
    });
    setMessage("");
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4 shadow-sm">
      {role === "teacher" && (
        <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase ml-1">
            Block New Word
          </label>
          <div className="flex gap-4">
            <input
              className="flex-1 p-3 border rounded-lg text-sm"
              placeholder="Type a word to block..."
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <button
              onClick={() => {
                onBlock(newWord);
                setNewWord("");
              }}
              className="bg-black text-white hover:bg-zinc-800 px-6 py-2 rounded-lg text-sm"
            >
              Block
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-black outline-none"
          >
            <option value="Spanish">Spanish</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Azerbaijani">Azerbaijani</option>
            <option value="Turkish">Turkish</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-black outline-none"
          >
            <option value="en">English (en)</option>
            <option value="az">Azerbaijani (az)</option>
            <option value="fr">French (fr)</option>
            <option value="pt">Portuguese (pt)</option>
            <option value="es">Spanish (es)</option>
            <option value="tr">Turkish (tr)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:ring-1 focus:ring-black outline-none"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 ml-1">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something helpful..."
          rows={4}
          className="w-full border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => setMessage("")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium"
        >
          Refresh
        </button>
        <button
          onClick={handleSend}
          className="px-6 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
