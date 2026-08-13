'use client';

import React from 'react';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { Currency } from '@/lib/types';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

interface RatesTickerProps {
  currencies?: Currency[];
}

export const RatesTicker: React.FC<RatesTickerProps> = ({ currencies }) => {
  const activeCurrencies = currencies && currencies.length > 0 ? currencies : INITIAL_CURRENCIES;

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 overflow-hidden whitespace-nowrap select-none group relative shadow-inner flex items-center">
      <div className="px-3 py-0.5 bg-emerald-950 border-r border-slate-800 text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1.5 z-10 shadow-md">
        <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span className="hidden sm:inline">NetDania Live FX</span>
      </div>

      <div className="animate-marquee-slow flex items-center gap-8 pl-4">
        {activeCurrencies.concat(activeCurrencies).map((curr, idx) => (
          <div key={`${curr.code}-${idx}`} className="inline-flex items-center gap-2 text-slate-300 shrink-0">
            <span className="font-bold text-white flex items-center gap-1.5">
              <img src={curr.flag} alt={curr.code} className="w-4 h-3 rounded-xs object-cover shadow-xs" />
              {curr.code}
            </span>
            <span className="text-slate-400">
              Sell: <strong className="text-emerald-400 font-extrabold">{curr.sellRate > 10 ? curr.sellRate.toFixed(1) : curr.sellRate.toFixed(2)}</strong>
            </span>
            <span className="text-slate-400">
              Buy: <strong className="text-slate-200 font-extrabold">{curr.buyRate > 10 ? curr.buyRate.toFixed(1) : curr.buyRate.toFixed(2)}</strong>
            </span>
            <span className={`inline-flex items-center text-[10px] font-bold ${curr.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {curr.change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {curr.change24h > 0 ? `+${curr.change24h}%` : `${curr.change24h}%`}
            </span>
            <span className="text-slate-700 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatesTicker;
