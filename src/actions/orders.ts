"use server";

import { Resend } from "resend";
import { z } from "zod";

const priceSchema = z.number().min(1).max(9);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendOfferEmail(prevState: unknown, formData: FormData) {
  const result = priceSchema.safeParse(formData.get("price"));

  if (result.success === false) {
    return { error: "price_error" };
  }

  return {};
}
