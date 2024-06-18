"use server";

import { TProduct, TUser } from "@/@types/general";
import OfferEmail from "@/email/OfferEmail";
import { Resend } from "resend";
import { z } from "zod";
import { TSenfOfferEmailReturnData } from "@/app/[lang]/_components/Modal/OfferForm/OfferForm";
import { getUser } from "@/app/[lang]/_api/getUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { TOffer } from "@/@types/general";
import OfferRejectEmail from "@/email/OfferRejectEmail";
import { getProduct } from "@/app/[lang]/_api/getProduct";

const priceSchema = z.string().min(1).max(9);
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

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
    from: `Support <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
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
    console.log(data.error);
  }

  const userDoc = doc(db, "users", owner.id);

  const newOffer: TOffer = {
    seen: false,
    productId: item.id,
    from: sender.email,
    offeredInCents: Number(offeredPrice) * 100,
    id: crypto.randomUUID(),
  };

  await updateDoc(userDoc, {
    offers: [...owner.offers, newOffer],
  });

  return { message: "email_success" };
}

export async function declineOffer(offer: TOffer, prevState: unknown) {
  const offerItem = await getProduct(offer.productId);

  if (offerItem == null) return { message: "failure" };

  const data = await resend.emails.send({
    from: `Support<${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
    to: offer.from,
    subject: "Offer",
    react: (
      <OfferRejectEmail
        from={`Support - ${process.env.NEXT_PUBLIC_SERVER_URL}`}
        offer={offer}
        offerItem={offerItem}
        createdAt={new Date(Date.now())}
      />
    ),
  });

  console.log(data);
  console.log(data);
  console.log(data);

  return { message: "success" };
}
