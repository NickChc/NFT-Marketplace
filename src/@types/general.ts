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
}
