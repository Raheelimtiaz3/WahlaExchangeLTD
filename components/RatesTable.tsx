'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { Search, Lock, LineChart, RefreshCw, ExternalLink, Activity } from 'lucide-react';

interface RatesTableProps {
  currencies: Currency[];
  onReserve: (curr: Currency) => void;
  onOpenChart?: (curr: Currency) => void;
  lastUpdated?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export const RatesTable: React.FC<RatesTableProps> = ({
  currencies,
  onReserve,
  onOpenChart,
  lastUpdated,
  isLoading,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
      {/* Header & NetDania Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-black uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>NetDania Live Forex Feed</span>
            </span>
            <a
              href="https://uk.m.netdania.com/forex"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-slate-500 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline"
            >
              <span>Source: NetDania UK Forex</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            Live Glasgow Exchange Rates
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Zero Commission • Counter Pickup at 22 Maxwell Road, Glasgow • Free 48h Rate Lock
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Refresh Button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh Live NetDania Rates"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Updating...' : 'Live Refresh'}</span>
            </button>
          )}

          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search USD, EUR, PKR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {lastUpdated && (
        <div className="mb-4 text-[11px] text-slate-500 font-medium flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <span>Real-time Glasgow Exchange Rates synced with NetDania Interbank Market Feed</span>
          <span className="font-mono text-slate-600">
            Last Updated: {new Date(lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-extrabold">
              <th className="pb-3 font-extrabold">Currency</th>
              <th className="pb-3 font-extrabold text-right">Our Sell Rate (We Sell)</th>
              <th className="pb-3 font-extrabold text-right hidden md:table-cell">Our Buy Rate (We Buy)</th>
              <th className="pb-3 font-extrabold text-right">24h Trend</th>
              <th className="pb-3 font-extrabold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filtered.map((curr) => {
              const formatRate = (r: number) => (r > 100 ? r.toFixed(1) : r.toFixed(2));

              return (
                <tr key={curr.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 flex items-center gap-3">
                    <img
                      src={curr.flag}
                      alt={curr.code}
                      className="w-6 h-4.5 rounded object-cover shadow-xs border border-slate-200"
                    />
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        {curr.code}
                        {curr.popular && (
                          <span className="px-1.5 py-0.5 text-[9px] bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">{curr.name}</div>
                    </div>
                  </td>

                  <td className="py-3.5 text-right font-black text-blue-600 text-sm sm:text-base">
                    {formatRate(curr.sellRate)}
                  </td>

                  <td className="py-3.5 text-right font-bold text-slate-600 hidden md:table-cell text-sm">
                    {formatRate(curr.buyRate)}
                  </td>

                  <td className="py-3.5 text-right font-bold">
                    <span className={curr.change24h >= 0 ? 'text-blue-600' : 'text-rose-600'}>
                      {curr.change24h > 0 ? `+${curr.change24h}%` : `${curr.change24h}%`}
                    </span>
                  </td>

                  <td className="py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {onOpenChart && (
                        <button
                          onClick={() => onOpenChart(curr)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
                          title="View Rate Chart"
                        >
                          <LineChart className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onReserve(curr)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Lock Rate</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatesTable;
