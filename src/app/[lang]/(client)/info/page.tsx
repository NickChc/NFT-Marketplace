import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { InfoPageCard } from "@/app/[lang]/(client)/info/_components/InfoPageCard";
import WhatIsNFTImage from "@/assets/images/whatIsNFT.webp";

interface InfoPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function InfoPage({ params: { lang } }: InfoPageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div className="container xl:w-[90%] xl:mx-auto pb-9">
      <PageHeader>{page.learnAboutNFT}</PageHeader>
      <div className="mt-14 flex flex-col gap-6">
        <InfoPageCard image={WhatIsNFTImage} title="What is NFT">
          NFTs, or Non-Fungible Tokens, are unique digital assets verified using
          blockchain technology. Unlike cryptocurrencies such as Bitcoin or
          Ethereum, which are fungible and can be exchanged on a one-to-one
          basis, each NFT has distinct information or attributes that make it
          unique.
        </InfoPageCard>
      </div>
    </div>
  );
}
