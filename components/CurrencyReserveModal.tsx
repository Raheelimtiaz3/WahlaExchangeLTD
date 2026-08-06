'use client';

import React, { useState } from 'react';
import { Currency, ReservationVoucher } from '@/lib/types';
import { X, Lock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface CurrencyReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialAmountForeign?: number;
  initialCostGbp?: number;
  onConfirmReservation: (voucher: ReservationVoucher) => void;
}

export const CurrencyReserveModal: React.FC<CurrencyReserveModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialAmountForeign,
  initialCostGbp,
  onConfirmReservation,
}) => {
  const [gbpAmount, setGbpAmount] = useState<number>(initialCostGbp || 500);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isOpen) return null;

  const calculatedForeign = gbpAmount * currency.sellRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const voucher: ReservationVoucher = {
      id: `WE-${Math.floor(100000 + Math.random() * 900000)}`,
      currencyCode: currency.code,
      currencyName: currency.name,
      amountForeign: calculatedForeign,
      costGbp: gbpAmount,
      exchangeRate: currency.sellRate,
      pickupDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName,
      customerEmail,
      customerPhone,
      status: 'RESERVED',
      createdAt: new Date().toISOString(),
      qrCodeSeed: `${currency.code}-${gbpAmount}-${Date.now()}`,
    };

    onConfirmReservation(voucher);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#14171F] border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img src={currency.flag} alt={currency.code} className="w-8 h-6 rounded object-cover shadow-sm" />
          <div>
            <h3 className="text-xl font-black text-white">Lock Rate for {currency.code}</h3>
            <p className="text-xs text-slate-400">{currency.name} • Live Rate: 1 GBP = {currency.sellRate} {currency.code}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#0B0D12] border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block">You Pay (GBP)</span>
              <input
                type="number"
                value={gbpAmount}
                onChange={(e) => setGbpAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-transparent text-lg font-black text-white focus:outline-none"
                min="10"
              />
            </div>
            <div>
              <span className="text-[10px] text-teal-400 font-bold block">You Receive ({currency.code})</span>
              <span className="text-lg font-black text-teal-400">
                {calculatedForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. John Smith"
              className="w-full py-2.5 px-3 bg-[#0B0D12] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Mobile / WhatsApp</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+44 7123 456789"
                className="w-full py-2.5 px-3 bg-[#0B0D12] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full py-2.5 px-3 bg-[#0B0D12] border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-900/60 text-[11px] text-teal-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Counter Pickup at 22 Maxwell Rd, Glasgow. Zero upfront payment required.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Lock className="w-4 h-4" />
            <span>Generate Free Counter Pickup Voucher</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurrencyReserveModal;

