import { getDictionaries } from "@/lib/dictionary";

export interface TOrder {
  paidInCents: number;
  id: string;
  productId: string;
}

export interface TOffer {
  productId: string;
  from: string;
  id: string;
  offeredInCents: number;
}

export interface TUser {
  spentInCents: number;
  id: string;
  uid: string;
  email: string;
  name: string;
  surname: string;
  ownings: TOwnedProduct[];
  offers: TOffer[];
  isFrozen: boolean;
}

interface TOwnedProduct {
  paidInCents: number;
  productId: string;
  productName: string;
}

export interface TProduct {
  id: string;
  isAvailable: boolean;
  openForBidding: boolean;
  createdAt: Date;
  name: string;
  description: string;
  priceInCents: number;
  orders: number;
  owner?: {
    fullName: string;
    userId: string;
    isFrozen: boolean;
    paidInCents: number;
  } | null;
  filePath: string;
  imagePath: string;
}

export interface TCreateProduct {
  name: string;
  description: string;
  priceInCents: string;
  filePath: File | null;
  imagePath: File | null;
}

export type TTranslations = Awaited<ReturnType<typeof getDictionaries>>;
