"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatSchema, type ChatFormData, COURSES, ROLES } from "../schemas/chatSchema";
import { type Message } from "../app/page";

interface FilterProps {
  onSend: (data: Message) => void;
  blockedWords: string[];
  onBlock: (word: string) => void;
}

export default function Filter({ onSend, blockedWords, onBlock }: FilterProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      course: "Spanish",
      language: "en",
      role: "student",
      message: "",
    },
  });

  const currentRole = watch("role");

  const onSubmit = (data: ChatFormData) => {
    const isBlocked =
      data.role === "student" &&
      blockedWords.some((word) => {
        const wordsInMessage = data.message.toLowerCase().split(/\s+/);
        return wordsInMessage.includes(word.toLowerCase());
      });

    onSend({
      ...data,
      timestamp: new Date().toLocaleTimeString(),
      isBlocked,
    });

    setValue("message", "");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-2xl border border-gray-200 space-y-4 shadow-sm"
    >
      {currentRole === "teacher" && (
        <div className="flex flex-col gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Block Word</label>
          <div className="flex gap-4">
            <input
              id="newWord"
              className="flex-1 p-3 border rounded-lg text-sm"
              placeholder="Type word..."
            />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("newWord") as HTMLInputElement;
                onBlock(el.value);
                el.value = "";
              }}
              className="bg-black text-white px-6 py-2 rounded-lg text-sm"
            >
              Block
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Course</label>
          <select
            {...register("course")}
            className="border rounded-lg px-3 py-2 bg-white outline-none focus:ring-1 focus:ring-black"
          >
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Language</label>
          <select
            {...register("language")}
            className="border rounded-lg px-3 py-2 bg-white outline-none focus:ring-1 focus:ring-black"
          >
            <option value="en">English (en)</option>
            <option value="es">Spanish (es)</option>
            <option value="pr">Portuguese (pr)</option>
            <option value="az">Azerbaijani (az)</option>
            <option value="fr">French (fr)</option>
            <option value="tr">Turkish (tr)</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 ml-1">Role</label>
          <select
            {...register("role")}
            className="border rounded-lg px-3 py-2 bg-white outline-none focus:ring-1 focus:ring-black"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 ml-1">Message</label>
        <textarea
          {...register("message")}
          placeholder="Say something..."
          rows={4}
          className="w-full border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-black"
        />
        {errors.message && (
          <span className="text-red-500 text-xs">{errors.message.message}</span>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded-lg text-sm">
          Reset
        </button>
        <button type="submit" className="px-6 py-2 rounded-lg bg-black text-white text-sm">
          Send
        </button>
      </div>
    </form>
  );
}