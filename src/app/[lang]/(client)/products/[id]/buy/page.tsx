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
  const { page } = await getDictionaries(params.lang);
  const product = await getProduct(params.id);

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
    <>
      <PageHeader>BUY {product?.name.toUpperCase()}</PageHeader>
      <PurchaseForm product={product} clientSecret={paymentIntent.client_secret} />
    </>
  );
}
