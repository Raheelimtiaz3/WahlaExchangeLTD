'use client';

import React, { useState } from 'react';
import { calculateTradeInQuote, TRADE_IN_MODELS } from '@/lib/tradein-data';
import { TradeInQuote } from '@/lib/types';
import {
  RefreshCw,
  DollarSign,
  Gift,
  CheckCircle2,
  Smartphone,
  Banknote,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface PhoneTradeInCalculatorProps {
  onApplyToCurrency: (creditValue: number) => void;
  onApplyToPhone: (creditValue: number) => void;
  onClaimVoucher: (quote: TradeInQuote) => void;
}

export default function PhoneTradeInCalculator({
  onApplyToCurrency,
  onApplyToPhone,
  onClaimVoucher,
}: PhoneTradeInCalculatorProps) {
  const [brand, setBrand] = useState<string>('Apple');
  const [model, setModel] = useState<string>('iPhone 15 Pro Max');
  const [storage, setStorage] = useState<string>('256GB');
  const [condition, setCondition] = useState<'Like New' | 'Good' | 'Fair' | 'Cracked Screen'>('Like New');
  const [batteryHealth, setBatteryHealth] = useState<'90%+' | '80-89%' | 'Below 80%'>('90%+');
  const [unlocked, setUnlocked] = useState<boolean>(true);

  // Available models for selected brand
  const brandModels = TRADE_IN_MODELS.filter((m) => m.brand === brand);

  const quote = calculateTradeInQuote({
    brand,
    model,
    storage,
    condition,
    batteryHealth,
    unlocked,
  });

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    const newModels = TRADE_IN_MODELS.filter((m) => m.brand === newBrand);
    if (newModels.length > 0) {
      setModel(newModels[0].model);
    }
  };

  return (
    <div id="tradein" className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Instant Device Trade-In
            </span>
            <span className="text-xs text-slate-400 font-medium">• Cash On Spot or Currency Credit</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-light text-white mt-1">
            Phone Trade-In Cash & Currency Estimator
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>No obligation • Price locked for 7 days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Form Controls */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* Step 1: Brand Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">1. Select Phone Brand</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => handleBrandChange(b)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center ${
                    brand === b
                      ? 'bg-teal-500 text-black shadow-md'
                      : 'bg-[#16191E] text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Model & Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">2. Select Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#16191E] border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {brandModels.map((m) => (
                  <option key={m.model} value={m.model}>
                    {m.model}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">3. Storage Size</label>
              <select
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                className="w-full bg-[#16191E] border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                <option value="128GB">128 GB</option>
                <option value="256GB">256 GB</option>
                <option value="512GB">512 GB</option>
                <option value="1TB">1 TB</option>
              </select>
            </div>
          </div>

          {/* Step 3: Device Physical Condition */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">4. Screen & Body Condition</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Like New', 'Good', 'Fair', 'Cracked Screen'] as const).map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setCondition(cond)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                    condition === cond
                      ? 'bg-teal-500 text-black font-extrabold shadow-md'
                      : 'bg-[#16191E] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Battery & Lock status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">5. Battery Health</label>
              <select
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(e.target.value as any)}
                className="w-full bg-[#16191E] border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                <option value="90%+">90%+ Maximum Capacity (Excellent)</option>
                <option value="80-89%">80-89% Maximum Capacity (Normal)</option>
                <option value="Below 80%">Below 80% (Service Recommended)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">6. Carrier Lock Status</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUnlocked(true)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${
                    unlocked
                      ? 'bg-teal-500 text-black'
                      : 'bg-[#16191E] text-slate-400 border border-slate-800'
                  }`}
                >
                  Unlocked Any SIM
                </button>
                <button
                  type="button"
                  onClick={() => setUnlocked(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${
                    !unlocked
                      ? 'bg-teal-500 text-black'
                      : 'bg-[#16191E] text-slate-400 border border-slate-800'
                  }`}
                >
                  Carrier Locked
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Valuation Card */}
        <div className="lg:col-span-5 bg-[#16191E] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] text-teal-500 font-bold uppercase tracking-[0.2em]">
              Instant Valuation Result
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              {brand} {model} ({storage})
            </h3>
          </div>

          <div className="space-y-3">
            {/* Option A: Cash Value */}
            <div className="p-4 rounded-xl bg-[#0F1115] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Banknote className="w-4 h-4 text-teal-400" /> Counter Cash Payout
                </span>
                <div className="text-2xl font-black text-teal-400 font-mono mt-0.5">
                  ${quote.estimatedCashValue} Cash
                </div>
              </div>
              <span className="text-[10px] px-2 py-1 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30 font-bold uppercase tracking-wider">
                Same-Day Pay
              </span>
            </div>

            {/* Option B: Store Credit Bonus (+10%) */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-teal-400 font-semibold flex items-center gap-1">
                  <Gift className="w-4 h-4 text-teal-400" /> Exchange Credit (+10% Bonus)
                </span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  ${quote.estimatedStoreCredit} Credit
                </div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-teal-500 text-black font-extrabold uppercase tracking-wider">
                Best Value
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => onClaimVoucher(quote)}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all uppercase tracking-wider"
            >
              <Smartphone className="w-4 h-4" />
              <span>Lock Valuation & Issue Trade Voucher</span>
            </button>

            <button
              onClick={() => onApplyToCurrency(quote.estimatedStoreCredit)}
              className="w-full py-2.5 rounded-xl bg-[#0F1115] hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Banknote className="w-4 h-4 text-teal-400" />
              <span>Use ${quote.estimatedStoreCredit} Credit For Foreign Currency</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
