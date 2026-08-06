'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import {
  ArrowRightLeft,
  Banknote,
  ShieldCheck,
  Bell,
  Ticket,
  Info,
  CheckCircle2,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface CurrencyConverterProps {
  onReserve: (data: {
    currencyCode: string;
    currencyName: string;
    flag: string;
    amountForeign: number;
    amountLocal: number;
    type: 'buy' | 'sell';
    rate: number;
  }) => void;
  onOpenRateAlert: (currency: Currency) => void;
}

export default function CurrencyConverter({
  onReserve,
  onOpenRateAlert,
}: CurrencyConverterProps) {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy'); // buy = customer buying foreign notes
  const [selectedCode, setSelectedCode] = useState<string>('EUR');
  const [usdAmount, setUsdAmount] = useState<string>('500');

  const selectedCurrency =
    INITIAL_CURRENCIES.find((c) => c.code === selectedCode) || INITIAL_CURRENCIES[0];

  const parsedUsd = parseFloat(usdAmount) || 0;

  // Conversion calculations
  const appliedRate = mode === 'buy' ? selectedCurrency.buyRate : selectedCurrency.sellRate;
  
  // If Mode is 'buy', USD -> Foreign (USD * buyRate)
  // If Mode is 'sell', Foreign -> USD (Foreign / sellRate or USD = Foreign * sellRate)
  const foreignAmount = mode === 'buy' ? parsedUsd * appliedRate : parsedUsd * appliedRate;

  const estimatedBankFeeSavings = Math.round(parsedUsd * 0.045 + 12); // Bank kiosk ~4.5% markup + $12 fee

  const handleSwapMode = () => {
    setMode(mode === 'buy' ? 'sell' : 'buy');
  };

  const handleReserveClick = () => {
    onReserve({
      currencyCode: selectedCurrency.code,
      currencyName: selectedCurrency.name,
      flag: selectedCurrency.flag,
      amountForeign: parseFloat(foreignAmount.toFixed(2)),
      amountLocal: parsedUsd,
      type: mode,
      rate: appliedRate,
    });
  };

  return (
    <div id="currency" className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em]">
                Live Rate Lock Calculator
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Guaranteed Counter Price
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-light text-white mt-1.5">
              Foreign Currency Converter & Rate Lock
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row p-1 rounded-xl bg-[#16191E] border border-slate-800 w-full lg:w-auto shrink-0 gap-1 sm:gap-0">
            <button
              onClick={() => setMode('buy')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                mode === 'buy'
                  ? 'bg-teal-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Buy Cash ({selectedCurrency.code})
            </button>
            <button
              onClick={() => setMode('sell')}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                mode === 'sell'
                  ? 'bg-teal-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sell Foreign Notes
            </button>
          </div>
        </div>

        {/* Converter Inputs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 sm:gap-4 items-center">
          {/* Input 1: Base Currency (USD) */}
          <div className="lg:col-span-5 bg-[#16191E] border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>{mode === 'buy' ? 'You Pay In US Dollars' : 'Equivalent Value Received'}</span>
              <span className="font-mono text-teal-400">USD ($)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🇺🇸</span>
              <input
                type="number"
                min="1"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                placeholder="500"
                className="w-full bg-transparent text-xl sm:text-3xl font-extrabold text-white focus:outline-none font-mono"
              />
              <span className="text-xs sm:text-sm font-bold text-slate-400 font-mono">USD</span>
            </div>
          </div>

          {/* Swap Button Icon */}
          <div className="lg:col-span-1 flex justify-center py-1 sm:py-0">
            <button
              onClick={handleSwapMode}
              className="p-3 rounded-full bg-[#16191E] hover:bg-teal-500 hover:text-black border border-slate-800 text-teal-400 transition-all shadow-lg active:scale-90"
              title="Toggle Buy / Sell mode"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Input 2: Selected Foreign Currency */}
          <div className="lg:col-span-5 bg-[#16191E] border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>{mode === 'buy' ? 'You Receive Foreign Cash' : 'Foreign Notes You Provide'}</span>
              <span className="font-mono text-teal-400">{selectedCurrency.code}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="bg-[#0F1115] border border-slate-800 text-white rounded-xl px-2 py-1.5 text-xs sm:text-sm font-bold focus:outline-none focus:border-teal-400 cursor-pointer max-w-[140px] sm:max-w-none"
              >
                {INITIAL_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>

              <div className="flex-1 text-right overflow-hidden">
                <span className="text-xl sm:text-3xl font-extrabold text-teal-400 font-mono truncate block">
                  {selectedCurrency.symbol}
                  {foreignAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Summary Card */}
        <div className="p-4 rounded-2xl bg-[#16191E] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400">Guaranteed Rate:</span>
              <span className="text-xs sm:text-sm font-mono font-bold text-teal-400">
                1 USD = {appliedRate} {selectedCurrency.code}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30 font-bold">
                0% Fee
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              You save approx <strong className="text-teal-400">${estimatedBankFeeSavings}</strong> vs airport kiosks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => onOpenRateAlert(selectedCurrency)}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-[#0F1115] hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Bell className="w-4 h-4 text-teal-400" />
              <span>Set Alert</span>
            </button>

            <button
              onClick={handleReserveClick}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-950/40 transition-all transform active:scale-95 uppercase tracking-wider"
            >
              <Ticket className="w-4 h-4" />
              <span>Reserve Voucher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
