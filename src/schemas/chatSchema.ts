import { z } from "zod";

export const COURSES = ["Spanish", "English", "French", "Portuguese", "Azerbaijani", "Turkish"] as const;
export const ROLES = ["student", "teacher"] as const;

export const chatSchema = z.object({
  course: z.enum([...COURSES], {
    message: "Please select a valid course from the list.",
  }),
  language: z.string().min(2, "Language code must be at least 2 characters (e.g., 'en')"),
  role: z.enum([...ROLES]),
  message: z
    .string()
    .min(3, "Message is too short (min. 3 characters)")
    .max(200, "Message is too long (max. 200 characters)")
    .transform((val) => val.trim())
    .refine((val) => !/^\d+$/.test(val), {
      message: "Message cannot consist only of numbers",
    }),
});

export type ChatFormData = z.infer<typeof chatSchema>;