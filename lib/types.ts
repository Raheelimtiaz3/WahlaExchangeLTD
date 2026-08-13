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

export interface RemittanceCorridor {
  code: string;
  country: string;
  currencyCode: string;
  currencySymbol: string;
  flag: string;
  ratePerGbp: number; // e.g. 360.50 PKR per 1 GBP
  feeGbp: number; // e.g. £2.50
  payoutMethods: ('Bank Deposit' | 'Cash Pickup' | 'Mobile Wallet')[];
  estimatedTime: string;
  popular: boolean;
}

export interface RemittanceQuote {
  sendAmountGbp: number;
  feeGbp: number;
  rate: number;
  receiveAmount: number;
  destinationCurrency: string;
  destinationCountry: string;
  payoutMethod: string;
}

export interface RemittanceTransferOrder {
  id: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string;
  recipientName: string;
  recipientPhone: string;
  recipientBankOrWallet?: string;
  recipientAccountNo?: string;
  destinationCountry: string;
  destinationCurrency: string;
  sendAmountGbp: number;
  transferFeeGbp: number;
  exchangeRate: number;
  recipientReceivesAmount: number;
  payoutMethod: string;
  createdAt: string;
  status: 'PENDING_VERIFICATION' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'COMPLETED';
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
  type: 'phone' | 'accessory' | 'vape' | 'currency_voucher';
  image: string;
  quantity: number;
  specs?: {
    storage?: string;
    color?: string;
    condition?: string;
  };
}

export interface StoragePricing {
  storage: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'chargers' | 'audio' | 'powerbanks' | 'esim' | 'vapes';
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
  storagePrices?: StoragePricing[];
  inStock: boolean;
  isAgeRestricted?: boolean;
}

export type ActivePageTab = 
  | 'home'
  | 'remittance'
  | 'currency-exchange'
  | 'mobile-tech'
  | 'vapes-retail'
  | 'about-us'
  | 'regulatory-info'
  | 'complaints'
  | 'contact';

export interface StoreBranch {
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
}
