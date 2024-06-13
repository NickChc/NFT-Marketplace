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
} from "@react-email/components";
import { TProduct, TUser } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";

interface OfferEmailProps {
  offerItem: TProduct;
  priceOffered: number;
  sender: TUser;
  createdAt: Date;
}

OfferEmail.PreviewProps = {
  offerItem: {
    createdAt: new Date(Date.now()),
    name: "Sailor ape NFT card.",
    description:
      "Famous sailor ape NFT card with striped shirt and sailor hat.",
    filePath:
      "https://firebasestorage.googleapis.com/v0/b/nft-marketplace-1e697.appspot.com/o/NFT's%2Fd2ca1180-f961-4752-896b-744836bcc097_sailor_monkey_NFT.txt?alt=media&token=a310c83a-4ca8-447b-9c6d-56bd1a95b46d",
    openForBidding: false,
    priceInCents: 1100000,
    owner: null,
    orders: 0,
    id: "qyATkNRzuHW6ZYfQL65y",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/nft-marketplace-1e697.appspot.com/o/NFT's%2F0dcdf6b2-eefa-4842-99f1-5581e135e2a2_modalidades-estafa-comunes-nft.jpg?alt=media&token=ccc6c526-a8ec-4c88-abd0-c15f49d4208d",
    isAvailable: true,
  },
  priceOffered: 12000,
  sender: {
    name: "Test",
    surname: "Subject",
    email: "nikoloz.chichua.1@btu.edu.ge",
    spentInCents: 0,
    ownings: [],
    id: "ej8z2eGuxPIBLBxZb5y3",
    uid: "gVeKNXT6npejh9i3pT65vifPGDt1",
    isFrozen: false,
  },
  createdAt: new Date(Date.now()),
} satisfies OfferEmailProps;

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function OfferEmail({
  offerItem,
  priceOffered,
  sender,
  createdAt,
}: OfferEmailProps) {
  return (
    <Html>
      <Preview>Offer Received</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container>
            <h1 className="px-4">Offer</h1>
            <Section className="block sm:hidden max-w-[90%] overflow-hidden">
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Sent On
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {dateFormatter.format(createdAt)}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Sender
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">{sender.email}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Price Offered
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {formatCurrency(priceOffered)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="hidden sm:block">
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Sent On
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {dateFormatter.format(createdAt)}
                  </Text>
                </Column>
                <Column>
                  {" "}
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Sender
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">{sender.email}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Price Offered
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {formatCurrency(priceOffered)}
                  </Text>
                </Column>
              </Row>
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
                    Sell For {formatCurrency(priceOffered)}
                  </Text>
                </Row>
                <Row>
                  <Column className="mt-4">
                    <div className="w-full flex flex-col sm:flex-row` justify-between gap-2">
                      <Button className="py-2 w-full max-w-20 text-center font-semibold border-solid border border-purple-800 rounded-md bg-purple-800 text-white">
                        Accept
                      </Button>
                      <Button className="py-2 w-full max-w-20 text-center font-semibold text-purple-800 border-solid border border-purple-800 rounded-md">
                        Decline
                      </Button>
                    </div>
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
