'use client';

import React, { useState } from 'react';
import { Currency } from '@/lib/types';
import { X, Bell, CheckCircle2, ShieldCheck } from 'lucide-react';

interface RateAlertModalProps {
  currency: Currency | null;
  onClose: () => void;
  onSaveAlert: (currencyCode: string, targetRate: number, email: string) => void;
}

export default function RateAlertModal({
  currency,
  onClose,
  onSaveAlert,
}: RateAlertModalProps) {
  const [targetRate, setTargetRate] = useState<number>(currency ? currency.buyRate * 1.02 : 1.0);
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  if (!currency) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    onSaveAlert(currency.code, targetRate, email);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative space-y-5 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">
              Set Rate Alert ({currency.code})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#16191E] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Rate Alert Activated!</h4>
            <p className="text-xs text-slate-400">
              We&apos;ll instantly alert <strong>{email}</strong> when {currency.code} reaches ${targetRate.toFixed(4)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-2xl bg-[#16191E] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400">Current Rate</span>
                <div className="text-sm font-mono font-bold text-white">
                  1 USD = {currency.buyRate} {currency.code}
                </div>
              </div>
              <span className="text-2xl">{currency.flag}</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Target Exchange Rate ({currency.code})
              </label>
              <input
                type="number"
                step="0.0001"
                required
                value={targetRate}
                onChange={(e) => setTargetRate(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email Address For Instant Notification
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wider"
            >
              <Bell className="w-4 h-4" />
              <span>Enable Smart Rate Alert</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
