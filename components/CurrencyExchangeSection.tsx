'use client';

import React, { useState } from 'react';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { REGULATORY_DETAILS, GLASGOW_BRANCH } from '@/lib/remittance-data';
import { Currency } from '@/lib/types';
import { CreditCard, Building2, ShieldCheck, Lock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface CurrencyExchangeSectionProps {
  onReserveCurrency: (currency: Currency) => void;
}

export const CurrencyExchangeSection: React.FC<CurrencyExchangeSectionProps> = ({
  onReserveCurrency,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(INITIAL_CURRENCIES[0]);
  const [exchangeMode, setExchangeMode] = useState<'buy' | 'sell'>('sell'); // 'sell' = store sells foreign currency to customer
  const [gbpAmount, setGbpAmount] = useState<number>(300);

  const currentRate = exchangeMode === 'sell' ? selectedCurrency.sellRate : selectedCurrency.buyRate;
  const calculatedForeign = gbpAmount * currentRate;

  return (
    <section id="currency-exchange" className="py-12 bg-white text-[#172033] rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-wider inline-block mb-2 border border-emerald-200">
            WAHLA FX • Bureau De Change
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            Foreign Currency Exchange
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Buy and sell foreign cash for travel or business at our Glasgow branch counter. Reserve online for 0% commission cash collection.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>HMRC MLR Registered (Sia Trade Ltd)</span>
        </div>
      </div>

      {/* Main Grid: Rate Calculator & Live Bureau Rates Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: FX Rate Reserve Widget */}
        <div className="lg:col-span-5 bg-[#F6F8FA] p-6 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#172033]">Reserve Foreign Cash</h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              Zero Upfront Payment
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-200 rounded-xl text-xs font-bold text-slate-700">
            <button
              onClick={() => setExchangeMode('sell')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                exchangeMode === 'sell' ? 'bg-white text-blue-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Buying Foreign Notes
            </button>
            <button
              onClick={() => setExchangeMode('buy')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                exchangeMode === 'buy' ? 'bg-white text-blue-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Selling Foreign Cash
            </button>
          </div>

          <div className="space-y-3">
            
            {/* Currency Select */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Select Currency</label>
              <select
                value={selectedCurrency.code}
                onChange={(e) => {
                  const found = INITIAL_CURRENCIES.find((c) => c.code === e.target.value);
                  if (found) setSelectedCurrency(found);
                }}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600"
              >
                {INITIAL_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GBP Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Amount in GBP (£)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 font-black text-slate-900 text-base">£</span>
                <input
                  type="number"
                  value={gbpAmount}
                  onChange={(e) => setGbpAmount(Math.max(10, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-16 py-3 bg-white border border-slate-300 rounded-xl text-lg font-black text-slate-900 focus:outline-none focus:border-blue-600"
                  min="10"
                />
                <span className="absolute right-3 text-xs font-bold bg-slate-100 text-slate-800 px-2 py-1 rounded-md">
                  GBP
                </span>
              </div>
            </div>

            {/* Counter Estimate Output */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-xs font-bold text-emerald-800 block">Estimated Foreign Amount</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-950">
                  {calculatedForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="font-extrabold text-xs text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-lg">
                  {selectedCurrency.code}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium pt-1">
                Counter Rate: 1 GBP = {currentRate} {selectedCurrency.code}
              </p>
            </div>

            <button
              onClick={() => onReserveCurrency(selectedCurrency)}
              className="w-full py-3.5 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Rate & Reserve for Glasgow Pickup</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center font-medium flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Collect at 22 Maxwell Road, Glasgow G41 1QE</span>
            </div>

          </div>
        </div>

        {/* Right Column: Live Rates Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#172033]">Glasgow Bureau Cash Rates</h3>
            <span className="text-xs text-slate-500 font-medium">Updated Counter Rates</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#0B1F33] text-slate-200 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4 text-right">We Sell (Store Sells)</th>
                  <th className="py-3 px-4 text-right">We Buy (Store Buys)</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {INITIAL_CURRENCIES.map((curr) => (
                  <tr key={curr.code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={curr.flag} alt={curr.name} className="w-6 h-4 rounded object-cover shadow-xs" />
                        <div>
                          <strong className="text-slate-900 block font-bold text-xs">{curr.code}</strong>
                          <span className="text-[10px] text-slate-500">{curr.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-black text-slate-900">
                      {curr.sellRate}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-600">
                      {curr.buyRate}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onReserveCurrency(curr)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold rounded-lg transition-all text-[11px] cursor-pointer"
                      >
                        Reserve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bureau Regulatory Disclosure Footer Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Currency Exchange Legal Disclosure</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {REGULATORY_DETAILS.bureauDisclosure}
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
