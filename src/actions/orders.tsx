"use server";

import { TProduct, TUser } from "@/@types/general";
import OfferEmail from "@/email/OfferEmail";
import { Resend } from "resend";
import { z } from "zod";
import { TSenfOfferEmailReturnData } from "@/app/[lang]/_components/Modal/OfferForm/OfferForm";
import { getUser } from "@/app/[lang]/_api/getUser";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, salesCollectionRef } from "@/firebase";
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

  if (data.error) {
    console.log(data);
  }

  return { message: "success" };
}

export async function acceptOffer(offer: TOffer, prevState: unknown) {
  const [offerMaker, offerItem] = await Promise.all([
    getUser(offer.from),
    getProduct(offer.productId),
  ]);

  if (offerMaker == null || offerItem == null) return { message: "failure" };

  const currentOwner = await getUser(
    undefined,
    undefined,
    offerItem.owner?.userId
  );

  if (currentOwner == null) return { message: "failure" };

  const offerItemDoc = doc(db, "product", offerItem.id);
  const oldOwnerDoc = doc(db, "users", currentOwner.id);
  const newOnwerDoc = doc(db, "users", offerMaker.id);

  const newOwnerFullName =
    offerMaker.name !== ""
      ? `${offerMaker.name} ${offerMaker.surname}`
      : offerMaker.email;

  await Promise.all([
    addDoc(salesCollectionRef, {
      paidInCents: offer.offeredInCents,
      productId: offer.productId,
    }),
    updateDoc(oldOwnerDoc, {
      ownings: currentOwner.ownings.filter((o) => o.productId !== offerItem.id),
      offers: currentOwner.offers.filter((off) => off.id !== offer.id),
    }),
    updateDoc(offerItemDoc, {
      owner: {
        fullName: newOwnerFullName,
        isFrozen: false,
        paidInCents: offer.offeredInCents,
        userId: offerMaker.id,
      },
      isAvailable: false,
      openForBidding: false,
      priceInCents:
        currentOwner.ownings.find((o) => o.productId === offerItem.id)
          ?.paidInCents || offerItem.priceInCents,
      orders: offerItem.orders + 1,
    }),
    updateDoc(newOnwerDoc, {
      ownings: [
        ...offerMaker.ownings,
        {
          paidInCents: offer.offeredInCents,
          productId: offerItem.id,
          productname: offerItem.name,
        },
      ],
      notifications: [
        ...offerMaker.notifications,
        {
          id: crypto.randomUUID(),
          subject: "offer_accepted",
          acceptedOffer: {
            acceptedPriceInCents: offer.offeredInCents,
            productId: offerItem.id,
            productName: offerItem.name,
          },
        },
      ],
      spentInCents: offerMaker.spentInCents + offer.offeredInCents,
    }),
  ]);

  return { message: "success" };
}
