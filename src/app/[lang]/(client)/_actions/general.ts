"use server";

import { z } from "zod";

const problemSchema = z.object({
  text: z.string().min(1),
});

export async function reportProblem(prevState: unknown, formData: FormData) {
  const result = problemSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { text: problem } = result.data;

  return {};
}
