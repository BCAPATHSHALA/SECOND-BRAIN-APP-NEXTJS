import { z } from "zod";

export const feedbackSchema = z.object({
  quote: z
    .string()
    .min(10, "Quote must be at least 10 characters")
    .max(500, "Quote must be at most 500 characters"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be at most 20 characters"),
  designation: z
    .string()
    .min(3, "Designation must be at least 3 characters")
    .max(100, "Designation must be at most 100 characters"),
  src: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().url({ message: "Image link must be a valid URL" }).optional()
  ),
  linkedinURL: z
    .string()
    .url({ message: "LinkedIn link must be a valid URL" })
    .refine((url) => url.startsWith("https://www.linkedin.com/"), {
      message: "LinkedIn URL must start with 'https://www.linkedin.com/'",
    }),
  twitterURL: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z
      .string()
      .url({ message: "Twitter link must be a valid URL" })
      .refine((url) => url.startsWith("https://x.com/"), {
        message: "Twitter URL must start with 'https://x.com/'",
      })
      .optional()
  ),
});

export type TFeedbackSchema = z.infer<typeof feedbackSchema>;
