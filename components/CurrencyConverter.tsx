'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { Lock, ShieldCheck } from 'lucide-react';

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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Instant Calculator
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">Reserve Foreign Currency</h3>
        </div>
        <div className="text-left sm:text-right text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
          Exchange Rate: <span className="text-slate-900 font-bold">1 GBP = {selectedCurrency.sellRate} {selectedCurrency.code}</span>
        </div>
      </div>

      <div className="space-y-5">
        {/* You Pay (GBP) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">You Pay (GBP)</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-500 font-black text-base">£</span>
            <input
              type="number"
              value={amountGbp}
              onChange={(e) => setAmountGbp(e.target.value)}
              className="w-full pl-9 pr-20 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-black text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
              placeholder="500"
              min="10"
            />
            <span className="absolute right-4 text-xs font-black text-slate-400 uppercase tracking-wider">GBP</span>
          </div>
        </div>

        {/* You Receive (Foreign Currency) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">You Receive (Estimated)</label>
          <div className="relative flex items-center">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="absolute left-2.5 py-2 px-3 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-800 focus:outline-none shadow-xs cursor-pointer"
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
              className="w-full pl-36 pr-16 py-3.5 bg-blue-50/50 border border-blue-200 rounded-2xl text-xl font-black text-blue-700 focus:outline-none"
            />
            <span className="absolute right-4 text-xs font-black text-blue-800 uppercase tracking-wider">{selectedCode}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
          <div className="flex justify-between">
            <span className="font-medium">Commission Fee:</span>
            <strong className="text-blue-700 font-extrabold">£0.00 (0% Hidden Markup)</strong>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Branch:</span>
            <strong className="text-slate-900 font-bold">22 Maxwell Rd, Glasgow, G41 1QE</strong>
          </div>
        </div>

        <button
          onClick={handleReserve}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Lock Rate & Get Free Counter Voucher</span>
        </button>

        <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          No upfront payment needed. Pay cash or card at Glasgow counter upon pickup.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
