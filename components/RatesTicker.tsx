'use client';

import React from 'react';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const RatesTicker: React.FC = () => {
  return (
    <div className="bg-[#0A0C0E] border-b border-slate-800/80 text-xs py-1.5 overflow-hidden whitespace-nowrap select-none">
      <div className="flex items-center animate-marquee gap-8 inline-block">
        {INITIAL_CURRENCIES.concat(INITIAL_CURRENCIES).map((curr, idx) => (
          <div key={`${curr.code}-${idx}`} className="inline-flex items-center gap-2 text-slate-300">
            <span className="font-bold text-white flex items-center gap-1.5">
              <img src={curr.flag} alt={curr.code} className="w-4 h-3 rounded-xs object-cover" />
              {curr.code}
            </span>
            <span className="text-slate-400">Sell: <strong className="text-teal-400">{curr.sellRate.toFixed(2)}</strong></span>
            <span className="text-slate-400">Buy: <strong className="text-slate-200">{curr.buyRate.toFixed(2)}</strong></span>
            <span className={`inline-flex items-center text-[10px] ${curr.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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

