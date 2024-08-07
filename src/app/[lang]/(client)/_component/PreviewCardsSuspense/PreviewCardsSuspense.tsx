import { TProduct } from "@/@types/general";
import { PreviewCards } from "../PreviewCards/PreviewCards";
import { TLocale } from "../../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";

interface PreviewCardsSuspenseProps {
  productsFetcher: () => Promise<
    [TProduct[] | undefined, TProduct[] | undefined, TProduct[] | undefined]
  >;
  lang: TLocale;
}

export async function PreviewCardsSuspense({
  productsFetcher,
  lang,
}: PreviewCardsSuspenseProps) {
  const { page } = await getDictionaries(lang);
  const [newest, withoutOwner, forBidding] = await productsFetcher();
  return (
    <>
      <PreviewCards lang={lang} products={newest} title={page.newest} />
      <PreviewCards
        lang={lang}
        products={forBidding?.slice(0, 3)}
        title={page.forBidding}
        href={`/${lang}/products?filterBy=forBidding`}
      />
      <PreviewCards
        lang={lang}
        products={withoutOwner?.slice(0, 3)}
        title={page.forSale}
        href={`/${lang}/products?filterBy=forSale`}
      />
    </>
  );
}
