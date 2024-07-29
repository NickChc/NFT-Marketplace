"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { Form } from "@/app/[lang]/(client)/products/_components/PurchaseForm/Form";
import { useDictionary } from "@/hooks/useDictionary";
import { blurDataImage } from "@/config/general";

interface PurchaseFormProps {
  product: TProduct;
  clientSecret: string;
  lang: TLocale;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function PurchaseForm({
  product,
  clientSecret,
  lang,
}: PurchaseFormProps) {
  const translations = useDictionary();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="aspect-video flex-shrink-0 w-full md:w-1/2 relative">
          <Image
            placeholder="blur"
            blurDataURL={blurDataImage}
            onError={(e) => {
              console.log("Failed to load image", e);
              e.currentTarget.src =
                "../../../../../assets/images/PlaceholderImg.webp";
            }}
            src={product.imagePath}
            alt={`Image for ${product.name}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 sm:text-xl">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-5 text-muted-foreground">
            {product.description}
          </div>
          <div className="text-lg">
            {translations.page.cost} -{" "}
            {formatCurrency(product.priceInCents / 100)}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form product={product} lang={lang} />
      </Elements>
    </>
  );
}
