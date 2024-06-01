"use client";

import { TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { Form } from "@/app/[lang]/(client)/products/_components/PurchaseForm/Form";

interface PurchaseFormProps {
  product: TProduct;
  clientSecret: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function PurchaseForm({ product, clientSecret }: PurchaseFormProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-1">
      <div className="aspect-video flex-shrink-0 w-full relative">
        <Image
          src={product.imagePath}
          alt={`Image for ${product.name}`}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-lg">
          {formatCurrency(product.priceInCents / 100)}
        </div>
        <div className="line-clamp-3 text-muted-foreground">
          {product.description}
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form priceInCents={product.priceInCents} productId={product.id} />
      </Elements>
    </div>
  );
}
