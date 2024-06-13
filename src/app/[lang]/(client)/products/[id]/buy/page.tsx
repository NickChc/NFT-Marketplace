import { TLocale } from "../../../../../../../i18n.config";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { getDictionaries } from "@/lib/dictionary";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { PurchaseForm } from "@/app/[lang]/(client)/products/_components/PurchaseForm";
import { notFound } from "next/navigation";
import Stripe from "stripe";

interface BuyPageProps {
  params: {
    lang: TLocale;
    id: string;
  };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function BuyPage({ params }: BuyPageProps) {
  const [{ page }, product] = await Promise.all([
    getDictionaries(params.lang),
    getProduct(params.id),
  ]);

  if (product == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  if (paymentIntent.client_secret == null) {
    throw new Error("Failed to create payment intent");
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-1 min-h-dvh">
      <PageHeader>
        {page.purchaseCap} {product?.name.toUpperCase()}
      </PageHeader>
      <PurchaseForm
        lang={params.lang}
        product={product}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  );
}
