"use server";

import { TNotification, TProduct, TUser } from "@/@types/general";
import OfferEmail from "@/email/OfferEmail";
import { Resend } from "resend";
import { z } from "zod";
import { TSenfOfferEmailReturnData } from "@/app/[lang]/_components/Modal/OfferForm/OfferForm";
import { getUser } from "@/app/[lang]/_api/getUser";
import {
  addDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, notificationsCollectionRef, salesCollectionRef } from "@/firebase";
import { TOffer } from "@/@types/general";
import OfferRejectEmail from "@/email/OfferRejectEmail";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import OfferAcceptEmail from "@/email/OfferAcceptEmail";
import { getNotifications } from "@/app/[lang]/_api/getNotifications";
import { updateUserNotes } from "@/app/[lang]/_api/updateUserNotes";
import { revalidatePath } from "next/cache";

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

  if (offeredPrice <= item.originalPriceInCents / 100) {
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
    productId: item.id,
    from: sender.email,
    offeredInCents: Number(offeredPrice) * 100,
    id: crypto.randomUUID(),
  };

  await updateDoc(userDoc, {
    offers: [...owner.offers, newOffer],
  });

  const newNote: Omit<TNotification, "id"> = {
    subject: "offer_received",
    offer: {
      offeredPriceInCents: Number(offeredPrice) * 100,
      productId: item.id,
      productName: item.name,
      id: newOffer.id,
    },
    userId: owner.id,
  };

  await addDoc(notificationsCollectionRef, newNote);

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

  if (offerItem == null) return { message: "failure" };

  const currentOwner = await getUser(
    undefined,
    undefined,
    offerItem.owner?.userId
  );

  if (offerMaker == null) {
    if (currentOwner == null) return { message: "failure" };
    const oldOwnerDoc = doc(db, "users", currentOwner?.id);

    await updateDoc(oldOwnerDoc, {
      offers: currentOwner.offers.filter((off) => off.from !== offer.from),
    });
    return { message: "no_owner" };
  }

  if (currentOwner == null) return { message: "no_owner" };

  const offerItemDoc = doc(db, "product", offerItem.id);
  const oldOwnerDoc = doc(db, "users", currentOwner.id);
  const newOnwerDoc = doc(db, "users", offerMaker.id);

  const newOwnerFullName =
    offerMaker.name !== ""
      ? `${offerMaker.name} ${offerMaker.surname}`
      : offerMaker.email;

  const newNote: Omit<TNotification, "id"> = {
    subject: "offer_accepted",
    offer: {
      productId: offerItem.id,
      productName: offerItem.name,
      offeredPriceInCents: 0,
      id: offer.id,
    },
    userId: offerMaker.id,
  };

  await Promise.all([
    addDoc(salesCollectionRef, {
      paidInCents: offer.offeredInCents,
      productId: offer.productId,
    }),
    updateUserNotes(currentOwner, offer.productId, newNote),
    updateDoc(oldOwnerDoc, {
      ownings: currentOwner.ownings.filter((o) => o.productId !== offerItem.id),
      offers: currentOwner.offers.filter(
        (off) => off.productId !== offer.productId
      ),
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
      spentInCents: offerMaker.spentInCents + offer.offeredInCents,
    }),

    revalidatePath("/*"),
  ]);

  const { name, imagePath, description } = offerItem;

  await resend.emails.send({
    from: `Support <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`,
    to: offer.from,
    subject: "Offer",
    react: (
      <OfferAcceptEmail
        createdAt={new Date(Date.now())}
        senderEmail={process.env.NEXT_PUBLIC_SENDER_EMAIL as string}
        offerItem={{ name, imagePath, description }}
        priceOfferedInCents={offer.offeredInCents}
      />
    ),
  });

  return { message: "success" };
}
