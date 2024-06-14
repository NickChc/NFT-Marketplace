"use server";

import { TProduct, TUser } from "@/@types/general";
import OfferEmail from "@/email/OfferEmail";
import { Resend } from "resend";
import { z } from "zod";
import { TSenfOfferEmailReturnData } from "@/app/[lang]/_components/Modal/OfferForm/OfferForm";
import { getUser } from "@/app/[lang]/_api/getUser";

const priceSchema = z.string().min(1).max(9);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendOfferEmail(
  sender: TUser | null,
  item: TProduct | null,
  prevState: unknown,
  formData: FormData
): Promise<TSenfOfferEmailReturnData> {
  const result = priceSchema.safeParse(formData.get("price"));

  if (result.success === false) {
    return { error: "problem_occured" };
  }

  const offeredPrice = Number(result.data);

  if (sender == null || item == null) {
    return { error: "problem_occured" };
  }

  if (offeredPrice <= item.owner?.paidInCents! / 100) {
    return { error: "price_error" };
  }

  const owner = await getUser(undefined, undefined, item.owner?.userId);

  if (owner == null) {
    return { error: "owner_error" };
  }

  const data = await resend.emails.send({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: owner.email,
    subject: "Offer",
    react: (
      <OfferEmail
        createdAt={new Date(Date.now())}
        sender={sender}
        offerItem={item}
        priceOffered={offeredPrice}
      />
    ),
  });

  if (data.error) {
    return { error: "email_error" };
  }

  return { message: "email_success" };
}
