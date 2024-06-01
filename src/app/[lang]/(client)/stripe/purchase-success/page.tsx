import { TLocale } from "../../../../../../i18n.config";
import Stripe from "stripe";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/[lang]/_api/getProduct";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { getDictionaries } from "@/lib/dictionary";

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
    <>
      <PageHeader>{isSuccess ? "Success!" : "Error!"}</PageHeader>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
          {/* <Button asChild className="mt-4" size="lg">
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(
                  product.id
                )}`}
              >
                Downlaod
              </a>
            ) : (
              <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
            )}
          </Button> */}
        </div>
      </div>
    </>
  );
}
