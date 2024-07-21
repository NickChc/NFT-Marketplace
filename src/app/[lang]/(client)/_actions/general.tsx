"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

const problemSchema = z.object({
  text: z.string().min(1),
});

export async function reportProblem(
  falseReport: boolean,
  prevState: unknown,
  formData: FormData
) {
  const result = problemSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const { text: problem } = result.data;

  if (falseReport) return { text: "success" };

  const data = await resend.emails.send({
    from: `NFT_Marketplace <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
    subject: "Problem reported",
    to: process.env.CREATOR_EMAIL as string,
    react: <div>{problem}</div>,
  });

  if (data.error) {
    console.log(data.error);
  }

  return { text: "success" };
}
