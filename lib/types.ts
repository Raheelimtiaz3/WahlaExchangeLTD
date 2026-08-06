export interface Currency {
  code: string;
  name: string;
  flag: string;
  buyRate: number; // Store buys foreign currency from customer (GBP per 1 Foreign)
  sellRate: number; // Store sells foreign currency to customer
  change24h: number;
  popular?: boolean;
  minAmount?: number;
}

export interface ReservationVoucher {
  id: string;
  currencyCode: string;
  currencyName: string;
  amountForeign: number;
  costGbp: number;
  exchangeRate: number;
  pickupDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'RESERVED' | 'READY_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  qrCodeSeed: string;
}

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  type: 'phone' | 'accessory' | 'currency_voucher';
  image: string;
  quantity: number;
  specs?: {
    storage?: string;
    color?: string;
    condition?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'chargers' | 'audio' | 'powerbanks' | 'esim';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  specs?: Record<string, string>;
  colorVariants?: { name: string; hex: string; image: string }[];
  storageOptions?: string[];
  inStock: boolean;
}
