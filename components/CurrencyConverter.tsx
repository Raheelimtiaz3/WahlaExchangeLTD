'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { ArrowRightLeft, Lock, ShieldCheck, MapPin } from 'lucide-react';

interface CurrencyConverterProps {
  currencies: Currency[];
  onReserveVoucher: (curr: Currency, amountForeign: number, costGbp: number) => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ currencies, onReserveVoucher }) => {
  const [selectedCode, setSelectedCode] = useState('USD');
  const [amountGbp, setAmountGbp] = useState<number | string>(500);

  const selectedCurrency = currencies.find((c) => c.code === selectedCode) || currencies[0];
  const gbpNum = typeof amountGbp === 'number' ? amountGbp : parseFloat(amountGbp) || 0;

  // Amount foreign customer receives when buying foreign currency with GBP
  const calculatedForeign = gbpNum * selectedCurrency.sellRate;

  const handleReserve = () => {
    if (gbpNum <= 0) return;
    onReserveVoucher(selectedCurrency, calculatedForeign, gbpNum);
  };

  return (
    <div className="bg-[#14171F] border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800/60">
            Instant Rate Calculator
          </span>
          <h3 className="text-xl font-black text-white mt-1">Reserve Currency Online</h3>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          Rate: <strong className="text-teal-400">1 GBP = {selectedCurrency.sellRate} {selectedCurrency.code}</strong>
        </div>
      </div>

      <div className="space-y-4">
        {/* You Pay (GBP) */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">You Pay (GBP)</label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 font-extrabold text-sm">£</span>
            <input
              type="number"
              value={amountGbp}
              onChange={(e) => setAmountGbp(e.target.value)}
              className="w-full pl-8 pr-20 py-3 bg-[#0F1115] border border-slate-700/80 rounded-xl text-lg font-black text-white focus:outline-none focus:border-teal-400"
              placeholder="500"
              min="10"
            />
            <span className="absolute right-3 text-xs font-black text-slate-400 uppercase">GBP</span>
          </div>
        </div>

        {/* You Receive (Foreign Currency) */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5">You Receive (Est.)</label>
          <div className="relative flex items-center">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="absolute left-2 py-1.5 px-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-teal-300 focus:outline-none"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              readOnly
              value={calculatedForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              className="w-full pl-28 pr-16 py-3 bg-[#0F1115] border border-slate-700/80 rounded-xl text-lg font-black text-teal-400 focus:outline-none"
            />
            <span className="absolute right-3 text-xs font-black text-slate-400 uppercase">{selectedCode}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
          <div className="flex justify-between">
            <span>Commission Fee:</span>
            <strong className="text-teal-400">£0.00 (Zero Commission)</strong>
          </div>
          <div className="flex justify-between">
            <span>Pickup Location:</span>
            <strong className="text-slate-200">22 Maxwell Rd, Glasgow, G41 1QE</strong>
          </div>
        </div>

        <button
          onClick={handleReserve}
          className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-teal-950/40 flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          <span>Lock Rate & Get Free Voucher</span>
        </button>

        <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          No prepayment required online. Pay cash or card at counter upon pickup.
        </p>
      </div>
    </div>
  );
};
