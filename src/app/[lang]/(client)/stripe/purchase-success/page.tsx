import { TLocale } from "../../../../../../i18n.config";
import Stripe from "stripe";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import { getDictionaries } from "@/lib/dictionary";
import { buyProduct } from "@/app/[lang]/_api/buyProduct";
import { PurchaseData } from "@/app/[lang]/(client)/stripe/purchase-success/_components/PurchaseData";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface PurchaseSuccessPageProps {
  params: {
    lang: TLocale;
  };
  searchParams: {
    payment_intent: string;
  };
}

export default async function PurchaseSuccessPage({
  params,
  searchParams,
}: PurchaseSuccessPageProps) {
  const { page } = await getDictionaries(params.lang);

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.productId == null) return notFound();

  const product = await getProduct(paymentIntent.metadata.productId);

  if (product == null) return notFound();

  const isSuccess = paymentIntent.status === "succeeded";

  return (
    <div className="min-h-dvh">
      <PageHeader>{isSuccess ? `${page.success}!` : `${page.error}!`}</PageHeader>
      <PurchaseData product={product} isSuccess={isSuccess} lang={params.lang} />
    </div>
  );
}
