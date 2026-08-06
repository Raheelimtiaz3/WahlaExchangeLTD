export interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
  buyRate: number; // Rate to buy currency from store
  sellRate: number; // Rate to sell currency to store
  midRate: number;
  change24h: number; // percentage change e.g. +0.45 or -0.12
  popular?: boolean;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East' | 'Africa';
}

export interface PhoneProduct {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Xiaomi' | 'OnePlus';
  model: string;
  price: number;
  originalPrice?: number;
  condition: 'Brand New' | 'Certified Refurbished' | 'Unlocked Pre-owned';
  storageOptions: string[];
  storagePrices?: Record<string, { price: number; originalPrice?: number }>;
  selectedStorage: string;
  colorVariants: { name: string; hex: string; image: string }[];
  image: string;
  rating: number;
  reviewsCount: number;
  specs: {
    display: string;
    chipset: string;
    camera: string;
    battery: string;
    warranty: string;
  };
  inStock: boolean;
  isBestseller?: boolean;
}

export interface AccessoryProduct {
  id: string;
  name: string;
  category: 'Chargers & Cables' | 'Power Banks' | 'Cases & Glass' | 'Audio & Wireless' | 'Travel eSIM & SIMs' | 'Adapters';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  compatibleModels: string[]; // e.g. ['iPhone 16', 'iPhone 15', 'Universal', 'Galaxy S25']
  features: string[];
  inStock: boolean;
  badge?: string;
  capacityOptions?: string[];
  capacityPrices?: Record<string, { price: number; originalPrice?: number }>;
  selectedCapacity?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  title: string;
  subtitle?: string;
  price: number;
  type: 'phone' | 'accessory' | 'currency';
  image: string;
  quantity: number;
  details?: {
    storage?: string;
    color?: string;
    currencyCode?: string;
    amount?: number;
  };
}

export interface CurrencyReservation {
  id: string;
  currencyCode: string;
  currencyName: string;
  flag: string;
  amountForeign: number;
  amountLocal: number;
  type: 'buy' | 'sell';
  exchangeRate: number;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'Confirmed' | 'Ready for Pickup' | 'Completed';
  createdAt: string;
  qrCodeSeed: string;
}

export interface TradeInQuote {
  brand: string;
  model: string;
  storage: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Cracked Screen';
  batteryHealth: '90%+' | '80-89%' | 'Below 80%';
  unlocked: boolean;
  estimatedCashValue: number;
  estimatedStoreCredit: number; // usually ~10% higher bonus
}

export interface StoreBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  queueWaitTime: string;
  currencyInStock: string[];
  features: string[];
  isAirport: boolean;
  lat?: number;
  lng?: number;
  googleMapsUrl?: string;
}
