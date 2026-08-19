'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { REGULATORY_DETAILS, GLASGOW_BRANCH } from '@/lib/remittance-data';
import { Currency } from '@/lib/types';
import {
  CreditCard,
  Building2,
  ShieldCheck,
  Lock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  Activity,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

interface CurrencyExchangeSectionProps {
  onReserveCurrency: (currency: Currency) => void;
  initialCurrencies?: Currency[];
  lastUpdated?: string;
  onRefreshRates?: () => void;
  isLoading?: boolean;
}

export const CurrencyExchangeSection: React.FC<CurrencyExchangeSectionProps> = ({
  onReserveCurrency,
  initialCurrencies,
  lastUpdated: externalLastUpdated,
  onRefreshRates,
  isLoading: externalIsLoading,
}) => {
  const currencies = initialCurrencies && initialCurrencies.length > 0 ? initialCurrencies : INITIAL_CURRENCIES;
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('USD');
  const [exchangeMode, setExchangeMode] = useState<'sell' | 'buy'>('sell'); // 'sell' = store sells foreign currency to customer
  const [gbpAmount, setGbpAmount] = useState<number>(300);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCurrency = currencies.find((c) => c.code === selectedCurrencyCode) || currencies[0] || INITIAL_CURRENCIES[0];
  const lastUpdated = externalLastUpdated || 'Live';
  const isLoading = !!externalIsLoading;

  const currentRate = exchangeMode === 'sell' ? selectedCurrency.sellRate : selectedCurrency.buyRate;
  const calculatedForeign = gbpAmount * currentRate;

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section id="currency-exchange" className="py-10 bg-white text-[#172033] rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
      
      {/* Top Header & NetDania Source Connection */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>WAHLA FX • Live Glasgow Bureau</span>
            </span>
            <a
              href="https://uk.m.netdania.com/forex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Live Feed Source: NetDania Forex (UK)</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            Live Glasgow Exchange Rates
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Real-time interbank market rates powered by NetDania Forex. 0% commission cash collection or exchange at our Glasgow branch counter (22 Maxwell Road).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onRefreshRates?.()}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer disabled:opacity-60"
            title="Refresh Live NetDania Market Feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Sync Live NetDania Rates'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Rate Calculator & Live Bureau Rates Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: FX Rate Reserve Widget */}
        <div className="lg:col-span-5 bg-[#F6F8FA] p-6 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Instant Rate Calculator</span>
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              0% Commission
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
              Buying Foreign Cash (GBP → FX)
            </button>
            <button
              onClick={() => setExchangeMode('buy')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                exchangeMode === 'buy' ? 'bg-white text-blue-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Selling Foreign Cash (FX → GBP)
            </button>
          </div>

          <div className="space-y-3.5">
            
            {/* Currency Select */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Select Foreign Currency</label>
              <select
                value={selectedCurrency.code}
                onChange={(e) => setSelectedCurrencyCode(e.target.value)}
                className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name} (Live NetDania: {c.sellRate})
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
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                <span>You Receive Approx:</span>
                <span className="text-[11px] text-emerald-700 font-mono">NetDania Live Rate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-950">
                  {calculatedForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="font-extrabold text-xs text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <img src={selectedCurrency.flag} alt={selectedCurrency.code} className="w-4 h-3 rounded-xs object-cover" />
                  {selectedCurrency.code}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium pt-1 border-t border-emerald-200/60 flex items-center justify-between">
                <span>1 GBP = {currentRate} {selectedCurrency.code}</span>
                <span className="text-emerald-700">0% Commission Fee</span>
              </p>
            </div>

            <button
              onClick={() => onReserveCurrency(selectedCurrency)}
              className="w-full py-3.5 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Rate & Free Reserve for Glasgow Pickup</span>
            </button>

            <div className="text-[11px] text-slate-500 text-center font-medium flex items-center justify-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Collection Desk: 22 Maxwell Road, Glasgow G41 1QE</span>
            </div>

          </div>
        </div>

        {/* Right Column: Live NetDania Rates Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
                <span>Glasgow Bureau Counter Rates</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Live NetDania Interbank Synced • Last Updated: {lastUpdated}
              </span>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search USD, EUR, PKR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#0B1F33] text-slate-200 font-bold uppercase text-[11px]">
                <tr>
                  <th className="py-3 px-4">Currency</th>
                  <th className="py-3 px-4 text-right">We Sell (Store Sells)</th>
                  <th className="py-3 px-4 text-right hidden sm:table-cell">We Buy (Store Buys)</th>
                  <th className="py-3 px-4 text-right">24h Trend</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCurrencies.map((curr) => (
                  <tr key={curr.code} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img src={curr.flag} alt={curr.name} className="w-6 h-4 rounded object-cover shadow-xs border border-slate-200" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-slate-900 font-bold text-xs">{curr.code}</strong>
                            {curr.popular && (
                              <span className="px-1.5 py-0.2 text-[9px] bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
                                Hot
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 truncate max-w-[120px] block">{curr.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                      {curr.sellRate}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-600 hidden sm:table-cell">
                      {curr.buyRate}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold ${
                          curr.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {curr.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                        )}
                        {curr.change24h > 0 ? `+${curr.change24h}%` : `${curr.change24h}%`}
                      </span>
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

          {/* Bureau Regulatory Disclosure & NetDania Verification Notice */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>HMRC Supervised Bureau de Change • NetDania Forex Sync</span>
              </div>
              <a
                href="https://uk.m.netdania.com/forex"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>uk.m.netdania.com/forex</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Foreign cash transactions and reservations are conducted at our Glasgow bureau counter (22 Maxwell Road, G41 1QE). Rates are calibrated in real-time against interbank benchmark feeds from NetDania.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

