import React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";
import { formatCurrency } from "@/lib/formatters";

interface OfferAcceptEmailProps {
  offerItem: {
    name: string;
    imagePath: string;
    description: string;
  };
  priceOfferedInCents: number;
  senderEmail: string;
  createdAt: Date;
}

OfferAcceptEmail.PreviewProps = {
  offerItem: {
    name: "Sailor ape NFT card.",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/nft-marketplace-1e697.appspot.com/o/NFT's%2F0dcdf6b2-eefa-4842-99f1-5581e135e2a2_modalidades-estafa-comunes-nft.jpg?alt=media&token=ccc6c526-a8ec-4c88-abd0-c15f49d4208d",
    description:
      "Famous sailor ape NFT card with striped shirt and sailor hat.",
  },
  priceOfferedInCents: 12000,
  createdAt: new Date(Date.now()),
  senderEmail: "NFT_Marketplace@gmail.com",
} satisfies OfferAcceptEmailProps;

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function OfferAcceptEmail({
  offerItem,
  priceOfferedInCents,
  createdAt,
  senderEmail,
}: OfferAcceptEmailProps) {
  return (
    <Html>
      <Preview>Offer Received</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container>
            <h1 className="px-4">Offer</h1>
            <Row>
              <Column>
                <Text className="m-0 font-semibold">Sent On</Text>
                <Text className="m-0">{dateFormatter.format(createdAt)}</Text>
              </Column>
              <Column>
                <Text className="m-0 font-semibold">Sender</Text>
                <Text className="m-0">{`Support - ${senderEmail}`}</Text>
              </Column>
            </Row>
            <Section>
              <h1>Congratulations!</h1>
              <h2>
                You offered {formatCurrency(priceOfferedInCents / 100)} for{" "}
                {offerItem.name} and the offer was accepted.
              </h2>
            </Section>

            <Section className="border border-solid border-purple-800 rounded-lg p-4 md:p-6 my-4">
              <Img
                width={"100%"}
                alt={offerItem.name}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${offerItem.imagePath}`}
              />
              <Row className="mt-8">
                <Row>
                  <Column className="align-bottom">
                    <Text className="text-lg font-bold m-0 mr-4">
                      {offerItem.name}
                    </Text>
                    <Text className="text-lg font-semibold m-0 mr-4 line-clamp-3">
                      {offerItem.description}
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Text className="text-xl font-semibold">
                    Sell For {formatCurrency(priceOfferedInCents / 100)}
                  </Text>
                </Row>
                <Row>
                  <Column align="right">
                    <Link
                      className="whitespace-nowrap px-2 py-1 w-full max-w-20 text-center font-semibold border-solid border border-purple-800 rounded-md bg-purple-800 text-white"
                      href={`${process.env.NEXT_PUBLIC_SERVER_URL}/en/profile`}
                    >
                      View
                    </Link>
                  </Column>
                </Row>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
