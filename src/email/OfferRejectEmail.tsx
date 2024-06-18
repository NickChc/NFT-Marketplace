import { TOffer, TProduct } from "@/@types/general";
import { formatCurrency } from "@/lib/formatters";
import {
  Body,
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

interface OfferRejectEmailProps {
  offer: TOffer;
  from: string;
  offerItem: {
    imagePath: string;
    name: string;
    description: string;
  };
  createdAt: Date;
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

OfferRejectEmail.PreviewProps = {
  from: `Support - NFT_Marketplace@gmail.com`,
  offer: {
    from: "nikoloz.chichua.1@btu.edu.ge",
    id: "81406fe4-01ab-4f21-a553-6ce4029757ce",
    offeredInCents: 550000,
    productId: "TsQNg4RgTk8YsrqTay8X",
  },
  offerItem: {
    description: "This mutant ape is crazy! it even has blaster eyes.",
    name: "Crazy mutant ape NFT",
    imagePath:
      "https://firebasestorage.googleapis.com/v0/b/nft-marketplace-1e697.appspot.com/o/NFT's%2F48a45060-2a6d-48db-ae29-0e172097533c_MutantApeNFT.webp?alt=media&token=03d907c6-4ff7-4198-9abe-48ae60f437f7",
  },
  createdAt: new Date(Date.now()),
} satisfies OfferRejectEmailProps;

export default function OfferRejectEmail({
  from,
  offer,
  offerItem,
  createdAt,
}: OfferRejectEmailProps) {
  return (
    <Html>
      <Preview>Your Offer Was Rejected</Preview>
      <Tailwind>
        <Head />
        <Body>
          <Container>
            <h1 className="text-lg sm:text-xl md:text-2xl">
              You offered {formatCurrency(offer.offeredInCents / 100)} for{" "}
              {offerItem.name}, the offer was rejected
            </h1>
            <Text className="text-lg">Keep up! You will get lucky next time.</Text>

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
                  <Text className="mt-0 mr-4 text-lg truncate max-w-20">
                    {from}
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Price Offered
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {formatCurrency(offer.offeredInCents / 100)}
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
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Sender
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">{from}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500 text-base whitespace-nowrap text-nowrap mr-4">
                    Price Offered
                  </Text>
                  <Text className="mt-0 mr-4 text-lg">
                    {formatCurrency(offer.offeredInCents / 100)}
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
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
