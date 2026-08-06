'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import {
  Search,
  LineChart,
  Ticket,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Filter,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface RatesTableProps {
  onOpenChart: (currency: Currency) => void;
  onReserve: (currency: Currency) => void;
  onOpenRateAlert: (currency: Currency) => void;
  searchQuery: string;
}

export default function RatesTable({
  onOpenChart,
  onReserve,
  onOpenRateAlert,
  searchQuery,
}: RatesTableProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [tableSearch, setTableSearch] = useState<string>('');

  const activeSearch = searchQuery || tableSearch;

  const regions = ['All', 'Europe', 'Asia-Pacific', 'Americas', 'Middle East'];

  const filteredCurrencies = INITIAL_CURRENCIES.filter((curr) => {
    const matchesRegion = selectedRegion === 'All' || curr.region === selectedRegion;
    const matchesSearch =
      curr.code.toLowerCase().includes(activeSearch.toLowerCase()) ||
      curr.name.toLowerCase().includes(activeSearch.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em]">
              Today&apos;s Board Rates
            </span>
            <span className="text-xs text-slate-400 font-medium">• Updated every 60s</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-light text-white mt-1">
            Global Foreign Exchange Live Board Rates
          </h2>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRegion === reg
                  ? 'bg-teal-500 text-black shadow-md'
                  : 'bg-[#16191E] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Table Local Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        <input
          type="text"
          value={tableSearch}
          onChange={(e) => setTableSearch(e.target.value)}
          placeholder="Filter by currency name or code (e.g. GBP, Yen)..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#16191E] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400"
        />
      </div>

      {/* Mobile Card Layout (Visible on Mobile Screens < 768px) */}
      <div className="md:hidden space-y-3">
        {filteredCurrencies.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs bg-[#16191E] rounded-2xl border border-slate-800">
            No currencies match your search query &quot;{activeSearch}&quot;.
          </div>
        ) : (
          filteredCurrencies.map((curr) => {
            const isPositive = curr.change24h >= 0;
            return (
              <div
                key={`mobile-${curr.code}`}
                className="p-4 rounded-2xl bg-[#16191E] border border-slate-800/90 space-y-3 shadow-md"
              >
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl leading-none">{curr.flag}</span>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span>{curr.code}</span>
                        <span className="text-slate-400 text-xs font-normal">• {curr.name}</span>
                        {curr.popular && (
                          <span className="px-1.5 py-0.2 text-[9px] bg-teal-500/20 text-teal-400 rounded font-mono font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {curr.region} • {curr.symbol}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      isPositive
                        ? 'text-teal-400 bg-teal-950/80 border border-teal-800/50'
                        : 'text-rose-400 bg-rose-950/80 border border-rose-800/50'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />
                    )}
                    {isPositive ? '+' : ''}
                    {curr.change24h}%
                  </span>
                </div>

                {/* Rates Grid */}
                <div className="grid grid-cols-2 gap-2 bg-[#0F1115] p-2.5 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                      Counter Buy Rate
                    </span>
                    <span className="font-mono text-sm font-extrabold text-teal-400">
                      ${curr.buyRate}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                      Counter Sell Rate
                    </span>
                    <span className="font-mono text-sm font-extrabold text-slate-200">
                      ${curr.sellRate}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onOpenChart(curr)}
                    className="p-2.5 rounded-xl bg-[#0F1115] hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 text-xs font-semibold flex-1"
                  >
                    <LineChart className="w-3.5 h-3.5 text-teal-400" />
                    <span>7D Trend</span>
                  </button>

                  <button
                    onClick={() => onOpenRateAlert(curr)}
                    className="p-2.5 rounded-xl bg-[#0F1115] hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center"
                    title="Set Rate Alert"
                  >
                    <Bell className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onReserve(curr)}
                    className="py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md flex-1 uppercase tracking-wider"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Reserve Rate</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Board Table (Visible on Medium Screens & Up >= 768px) */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#16191E] text-slate-400 text-[10px] uppercase tracking-[0.2em] border-b border-slate-800 font-bold">
              <th className="py-3.5 px-4">Currency</th>
              <th className="py-3.5 px-4 text-right">Counter Buy Rate ($)</th>
              <th className="py-3.5 px-4 text-right">Counter Sell Rate ($)</th>
              <th className="py-3.5 px-4 text-center">24h Trend</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs font-medium">
            {filteredCurrencies.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No currencies match your search query &quot;{activeSearch}&quot;.
                </td>
              </tr>
            ) : (
              filteredCurrencies.map((curr) => {
                const isPositive = curr.change24h >= 0;
                return (
                  <tr
                    key={curr.code}
                    className="hover:bg-[#16191E]/70 transition-colors group"
                  >
                    {/* Currency Name & Flag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{curr.flag}</span>
                        <div>
                          <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                            {curr.code}
                            <span className="text-slate-400 font-normal text-xs">
                              - {curr.name}
                            </span>
                            {curr.popular && (
                              <span className="px-1.5 py-0.2 text-[9px] bg-teal-500/20 text-teal-400 rounded font-mono font-bold">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">
                            Symbol: {curr.symbol} • {curr.region}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Buy Rate */}
                    <td className="py-3.5 px-4 text-right font-mono text-sm font-bold text-teal-400">
                      ${curr.buyRate}
                    </td>

                    {/* Sell Rate */}
                    <td className="py-3.5 px-4 text-right font-mono text-sm font-bold text-slate-200">
                      ${curr.sellRate}
                    </td>

                    {/* 24h Change */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-mono font-bold ${
                          isPositive
                            ? 'text-teal-400 bg-teal-950/60 border border-teal-800/40'
                            : 'text-rose-400 bg-rose-950/60 border border-rose-800/40'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                        )}
                        {isPositive ? '+' : ''}
                        {curr.change24h}%
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onOpenChart(curr)}
                          className="p-2 rounded-lg bg-[#16191E] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="View 7-day trend chart"
                        >
                          <LineChart className="w-4 h-4 text-teal-400" />
                        </button>

                        <button
                          onClick={() => onOpenRateAlert(curr)}
                          className="p-2 rounded-lg bg-[#16191E] hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="Set Rate Alert"
                        >
                          <Bell className="w-4 h-4 text-slate-400" />
                        </button>

                        <button
                          onClick={() => onReserve(curr)}
                          className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs flex items-center gap-1 shadow-md shadow-teal-950/30 transition-all active:scale-95"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Reserve</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
