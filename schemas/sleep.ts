import { noteMaxLength } from "@/lib/consts";
import { z } from "zod";

export const sleepFormSchema = z
  .object({
    wentToBedAt: z.date({
      errorMap: () => ({
        message: "Must be a valid date.",
      }),
    }),
    wokeUpAt: z.date({
      errorMap: () => ({
        message: "Must be a valid date.",
      }),
    }),
    sleepRate: z
      .number()
      .min(1, { message: "Sleep rate must be between 1 and 5." })
      .max(5, { message: "Sleep rate must be between 1 and 5." }),
    note: z
      .string()
      .max(noteMaxLength, {
        message: `Note can't exceed ${noteMaxLength} characters.`,
      })
      .optional(),
  })
  .refine((data) => data.wokeUpAt > data.wentToBedAt, {
    message: "You can't wake up before you go to sleep.",
    path: ["wokeUpAt"],
  });
