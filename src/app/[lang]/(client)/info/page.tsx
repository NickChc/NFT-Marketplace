import { TLocale } from "../../../../../i18n.config";
import { getDictionaries } from "@/lib/dictionary";
import { PageHeader } from "@/app/[lang]/_components/PageHeader";
import { InfoPageCard } from "@/app/[lang]/(client)/info/_components/InfoPageCard";
import WhatIsNFTImage from "@/assets/images/whatIsNFT.webp";
import BenjaminNFTImage from "@/assets/images/BenjaminNFT.jpg";
import PixeledNFTImage from "@/assets/images/PixeledNFT.jpg";

interface InfoPageProps {
  params: {
    lang: TLocale;
  };
}

export default async function InfoPage({ params: { lang } }: InfoPageProps) {
  const { page } = await getDictionaries(lang);

  return (
    <div className="container xl:w-[80%] xl:mx-auto pb-9">
      <PageHeader>{page.learnAboutNFT}</PageHeader>
      <div className="mt-14 flex flex-col gap-6">
        <InfoPageCard image={WhatIsNFTImage} title="What is NFT">
          NFTs, or Non-Fungible Tokens, are unique digital assets verified using
          blockchain technology. Unlike cryptocurrencies such as Bitcoin or
          Ethereum, which are fungible and can be exchanged on a one-to-one
          basis, each NFT has distinct information or attributes that make it
          unique.
        </InfoPageCard>

        <InfoPageCard image={BenjaminNFTImage} title="Smart Contracts">
          NFTs utilize smart contracts, which are self-executing contracts with
          the terms of the agreement directly written into code. This allows for
          automated transactions and royalties, where creators can earn a
          percentage of sales every time the NFT is resold.
        </InfoPageCard>

        <InfoPageCard image={PixeledNFTImage} title="Diverse Use Cases">
          NFTs have a wide range of applications beyond digital art. They are
          used in:
          <ul className="flex flex-col gap-3 list-disc text-start mt-4 self-center pl-6">
            <li>
              <span className="font-semibold">Gaming:</span> Players can own,
              trade, and sell unique in-game items.
            </li>
            <li>
              <span className="font-semibold">Virtual Real Estate:</span>{" "}
              Platforms like Decentraland and The Sandbox allow users to buy,
              sell, and develop virtual land.
            </li>
            <li>
              <span className="font-semibold">Collectibles:</span> Digital
              trading cards, virtual pets, and other collectible items are
              popular in the NFT space.
            </li>
            <li>
              <span className="font-semibold">Music and Entertainment:</span>{" "}
              Musicians and artists release exclusive content and experiences
              through NFTs.
            </li>
          </ul>
        </InfoPageCard>
      </div>
    </div>
  );
}
