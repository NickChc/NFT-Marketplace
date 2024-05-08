import { getDictionaries } from "@/lib/dictionary";
import { Timestamp } from "firebase/firestore";

export interface TOrder {
  pricePaidInCents: number;
  id: string;
  productId: string;
}

export interface TUser {
  spentInCents: number;
  id: string;
  email: string;
  name: string;
  surname: string;
  ownings: TProduct[];
}

export interface TProduct {
  id: string;
  isAvailable: boolean;
  createdAt: Date;
  name: string;
  description: string;
  priceInCents: number;
  orders: number;
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
