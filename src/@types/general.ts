import { Timestamp } from "firebase/firestore";

export interface TOrder {
  pricePaidInCents: number;
  id: string;
  productId: string;
}

export interface TUser {
  pricePaidInCents: number;
  id: string;
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
