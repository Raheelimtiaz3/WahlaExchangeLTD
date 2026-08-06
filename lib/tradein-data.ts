export interface TradeInModel {
  brand: string;
  model: string;
  storageValues: Record<string, number>; // Storage size -> max trade value in GBP
}

export const TRADEIN_MODELS: TradeInModel[] = [
  {
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    storageValues: { '256GB': 680, '512GB': 740, '1TB': 800 },
  },
  {
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    storageValues: { '128GB': 580, '256GB': 630, '512GB': 690 },
  },
  {
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    storageValues: { '128GB': 490, '256GB': 540, '512GB': 600 },
  },
  {
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    storageValues: { '256GB': 620, '512GB': 680, '1TB': 730 },
  },
  {
    brand: 'Samsung',
    model: 'Galaxy S23 Ultra',
    storageValues: { '256GB': 420, '512GB': 470 },
  },
  {
    brand: 'Google',
    model: 'Pixel 8 Pro',
    storageValues: { '128GB': 340, '256GB': 380, '512GB': 420 },
  },
];
