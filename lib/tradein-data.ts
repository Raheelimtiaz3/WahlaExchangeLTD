import { TradeInQuote } from './types';

export const TRADE_IN_MODELS = [
  { brand: 'Apple', model: 'iPhone 15 Pro Max', baseValue: 720 },
  { brand: 'Apple', model: 'iPhone 15 Pro', baseValue: 620 },
  { brand: 'Apple', model: 'iPhone 15', baseValue: 480 },
  { brand: 'Apple', model: 'iPhone 14 Pro Max', baseValue: 560 },
  { brand: 'Apple', model: 'iPhone 14 Pro', baseValue: 490 },
  { brand: 'Apple', model: 'iPhone 14', baseValue: 380 },
  { brand: 'Apple', model: 'iPhone 13 Pro', baseValue: 390 },
  { brand: 'Apple', model: 'iPhone 13', baseValue: 290 },
  { brand: 'Samsung', model: 'Galaxy S24 Ultra', baseValue: 680 },
  { brand: 'Samsung', model: 'Galaxy S24+', baseValue: 490 },
  { brand: 'Samsung', model: 'Galaxy S24', baseValue: 390 },
  { brand: 'Samsung', model: 'Galaxy S23 Ultra', baseValue: 450 },
  { brand: 'Samsung', model: 'Galaxy Z Fold 5', baseValue: 580 },
  { brand: 'Google', model: 'Pixel 8 Pro', baseValue: 420 },
  { brand: 'Google', model: 'Pixel 8', baseValue: 310 },
  { brand: 'Google', model: 'Pixel 7 Pro', baseValue: 260 },
  { brand: 'Xiaomi', model: 'Xiaomi 13 Ultra', baseValue: 380 },
  { brand: 'OnePlus', model: 'OnePlus 12', baseValue: 410 },
];

export function calculateTradeInQuote(params: {
  brand: string;
  model: string;
  storage: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Cracked Screen';
  batteryHealth: '90%+' | '80-89%' | 'Below 80%';
  unlocked: boolean;
}): TradeInQuote {
  const modelMatch = TRADE_IN_MODELS.find(
    (m) => m.brand === params.brand && m.model === params.model
  ) || { baseValue: 300 };

  let val = modelMatch.baseValue;

  // Storage multiplier
  if (params.storage === '256GB') val += 40;
  if (params.storage === '512GB') val += 90;
  if (params.storage === '1TB') val += 150;

  // Condition modifier
  if (params.condition === 'Like New') val *= 1.0;
  else if (params.condition === 'Good') val *= 0.88;
  else if (params.condition === 'Fair') val *= 0.72;
  else if (params.condition === 'Cracked Screen') val *= 0.48;

  // Battery multiplier
  if (params.batteryHealth === '90%+') val *= 1.0;
  else if (params.batteryHealth === '80-89%') val *= 0.93;
  else if (params.batteryHealth === 'Below 80%') val *= 0.85;

  // Unlocked bonus
  if (params.unlocked) val += 25;

  const cashVal = Math.max(25, Math.round(val));
  const creditVal = Math.round(cashVal * 1.10); // 10% in-store credit bonus

  return {
    brand: params.brand,
    model: params.model,
    storage: params.storage,
    condition: params.condition,
    batteryHealth: params.batteryHealth,
    unlocked: params.unlocked,
    estimatedCashValue: cashVal,
    estimatedStoreCredit: creditVal,
  };
}
