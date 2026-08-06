'use client';

import React from 'react';
import { Currency } from '@/lib/types';
import { generateHistoricalData } from '@/lib/currency-data';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { X, TrendingUp, Calendar, ShieldCheck, Ticket } from 'lucide-react';

interface CurrencyChartModalProps {
  currency: Currency | null;
  onClose: () => void;
  onReserve: (currency: Currency) => void;
}

export default function CurrencyChartModal({
  currency,
  onClose,
  onReserve,
}: CurrencyChartModalProps) {
  if (!currency) return null;

  const chartData = generateHistoricalData(currency.code, currency.midRate);
  const minRate = Math.min(...chartData.map((d) => d.rate));
  const maxRate = Math.max(...chartData.map((d) => d.rate));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative space-y-6 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currency.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  {currency.name} ({currency.code})
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-amber-400 border border-slate-700">
                  7-Day Trend
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mid-market benchmark rate vs USD ($)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Rate Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Current Buy Rate</div>
            <div className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
              ${currency.buyRate}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">7D High</div>
            <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">
              ${maxRate}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">7D Low</div>
            <div className="text-lg font-mono font-bold text-slate-300 mt-0.5">
              ${minRate}
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-64 w-full bg-slate-950/60 p-2 rounded-2xl border border-slate-800/80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                domain={['auto', 'auto']}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(val: any) => [`$${val}`, 'Rate']}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#rateGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" /> Rates updated in real-time
          </span>

          <button
            onClick={() => {
              onClose();
              onReserve(currency);
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-950/40"
          >
            <Ticket className="w-4 h-4" />
            <span>Lock Rate & Reserve {currency.code} Cash</span>
          </button>
        </div>
      </div>
    </div>
  );
}
