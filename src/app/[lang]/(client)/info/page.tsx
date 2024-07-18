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
    <div className="container xl:w-[80%] xl:mx-auto pb-9 px-1 mx-auto">
      <PageHeader>{page.learnAboutNFT}</PageHeader>
      <div className="mt-14 flex flex-col gap-6">
        <InfoPageCard image={WhatIsNFTImage} title={page.whatIsNFT}>
          {lang === "ka"
            ? "NFT, ანუ Non-Fungible Tokens ე.წ ჩაუნაცვლებელი ტოკენი, არის უნიკალური ციფრული ქონება, რომელიც ვერიფიცირებულია ბლოქჩეინ ტექნოლოგიით. კრიპტოვალუტისგან განსხვავებით, (ბითქოინი, ეთერიუმი და სხვა, რომელიც იცვლება) NFT ატარებს გამომარჩეველ ინფორმაციას და ატრიბუტებს, რაც მას უნიკალურად აქცევს."
            : "NFTs, or Non-Fungible Tokens, are unique digital assets verified using blockchain technology. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis, each NFT has distinct information or attributes that make it unique."}
        </InfoPageCard>

        <InfoPageCard image={BenjaminNFTImage} title={page.smartContracts}>
          {lang === "ka"
            ? "NFT-ები იყენებენ ჭკვიან კონტრაქტებს, ისინი თვით-აღმასრულებელი კონტრაქტებია, რომლის პირობებიც NFT-ს კოდშია ჩაშენებული. ეს იძლევა ავტომატიზირებული ტრანზაქციების და მოგების საშუალებებს, სადაც შემქმნელები გამოიმუშავებენ პროცენტს ყოველი NFT გადაყიდვისას."
            : "NFTs utilize smart contracts, which are self-executing contracts with the terms of the agreement directly written into code. This allows for automated transactions and royalties, where creators can earn a percentage of sales every time the NFT is resold."}
        </InfoPageCard>

        <InfoPageCard image={PixeledNFTImage} title={page.diverseUseCases}>
          {lang === "ka"
            ? "NFT-ს აქვს გამოყენების ფართო არეალი. გარდა ხელოვნებისა მისი გამოყენების სფეროებია:"
            : "NFTs have a wide range of applications beyond digital art. They are used in:"}

          <ul className="flex flex-col gap-3 list-disc text-start mt-4 self-center pl-6">
            <li>
              <span className="font-semibold">{page.gaming}: </span>
              {lang === "ka"
                ? "მოთამაშეებს შეუძლიათ თამაშში უნიკალური ნივთების: ფლობა, გაცვლა ან გაყიდვა"
                : "Players can own, trade, and sell unique in-game items."}
            </li>
            <li>
              <span className="font-semibold">{page.virtualRealEstate}:</span>{" "}
              {lang === "ka"
                ? "პლატფორმები, როგორიცაა: Decentraland და Sandbox, მომხმარებლებს აძლევს საშუალებას, იყიდონ, გაყიდონ ან გამოიმუშავონ ვირტუალური ფართი."
                : "Platforms like Decentraland and The Sandbox allow users to buy, sell or develop virtual land."}
            </li>
            <li>
              <span className="font-semibold">{page.collectibles}:</span>{" "}
              {lang === "ka"
                ? "ციფრული სავაჭრო ბარათები, ვირტუალური შინაური ცხოველები და სხვა საკოლექციო ნივთები პოპულარულია NFT სივრცეში."
                : "Digital trading cards, virtual pets, and other collectible items are popular in the NFT space."}
            </li>
            <li>
              <span className="font-semibold">
                {page.musicAndEntertainment}:
              </span>{" "}
              {lang === "ka"
                ? "მუსიკოსები და არტისტები აწარმოებენ ექსკლუზიურ კონტენტს NFT-ს სახით."
                : "Musicians and artists release exclusive content and experiences through NFTs."}
            </li>
          </ul>
        </InfoPageCard>
      </div>
    </div>
  );
}
