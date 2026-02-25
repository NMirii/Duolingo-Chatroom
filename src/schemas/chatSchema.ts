import { z } from "zod";

export const chatSchema = z.object({
  course: z.string(),
  language: z.string(),
  role: z.string(),
  message: z.string().min(1, "Mesaj boş ola bilməz!"),
});

export type ChatFormData = z.infer<typeof chatSchema>;