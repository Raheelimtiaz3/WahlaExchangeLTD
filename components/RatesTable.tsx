'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { Search, ArrowUpDown, Lock, Ticket, LineChart } from 'lucide-react';

interface RatesTableProps {
  currencies: Currency[];
  onReserve: (curr: Currency) => void;
  onOpenChart?: (curr: Currency) => void;
}

export const RatesTable: React.FC<RatesTableProps> = ({ currencies, onReserve, onOpenChart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#14171F] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            Live Glasgow Exchange Rates
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Zero Commission • Counter Pickup at 22 Maxwell Road, Glasgow • Online Rate Lock
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search USD, EUR, PKR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0F1115] border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="pb-3 font-semibold">Currency</th>
              <th className="pb-3 font-semibold text-right">Our Sell Rate (We Sell)</th>
              <th className="pb-3 font-semibold text-right hidden md:table-cell">Our Buy Rate (We Buy)</th>
              <th className="pb-3 font-semibold text-right">24h Trend</th>
              <th className="pb-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {filtered.map((curr) => (
              <tr key={curr.code} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 flex items-center gap-3">
                  <img src={curr.flag} alt={curr.code} className="w-6 h-4.5 rounded object-cover shadow-sm" />
                  <div>
                    <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                      {curr.code}
                      {curr.popular && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-teal-950 text-teal-300 font-bold rounded border border-teal-800/50">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{curr.name}</div>
                  </div>
                </td>

                <td className="py-3.5 text-right font-black text-teal-400 text-sm sm:text-base">
                  {curr.sellRate.toFixed(2)}
                </td>

                <td className="py-3.5 text-right font-bold text-slate-300 hidden md:table-cell text-sm">
                  {curr.buyRate.toFixed(2)}
                </td>

                <td className="py-3.5 text-right font-semibold">
                  <span className={curr.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {curr.change24h > 0 ? `+${curr.change24h}%` : `${curr.change24h}%`}
                  </span>
                </td>

                <td className="py-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {onOpenChart && (
                      <button
                        onClick={() => onOpenChart(curr)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="View Rate Chart"
                      >
                        <LineChart className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onReserve(curr)}
                      className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-lg transition-all flex items-center gap-1 shadow-md"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Lock Rate</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
