'use client';

import React, { useState } from 'react';
import { Currency, ReservationVoucher } from '@/lib/types';
import { REGULATORY_DETAILS } from '@/lib/remittance-data';
import { X, Lock, ShieldCheck, MapPin } from 'lucide-react';

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
  const [gbpAmount, setGbpAmount] = useState<number>(initialCostGbp || 300);
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
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 text-slate-900 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <img src={currency.flag} alt={currency.code} className="w-8 h-6 rounded object-cover shadow-xs" />
          <div>
            <h3 className="text-xl font-extrabold text-[#172033]">Lock Rate for {currency.code}</h3>
            <p className="text-xs text-slate-500 font-medium">
              {currency.name} • Counter Rate: 1 GBP = {currency.sellRate} {currency.code}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F6F8FA] border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">You Pay (GBP)</span>
              <input
                type="number"
                value={gbpAmount}
                onChange={(e) => setGbpAmount(Math.max(10, parseFloat(e.target.value) || 0))}
                className="w-full bg-transparent text-lg font-black text-slate-900 focus:outline-none"
                min="10"
              />
            </div>
            <div>
              <span className="text-[11px] text-emerald-700 font-bold block">You Receive ({currency.code})</span>
              <span className="text-lg font-black text-emerald-700">
                {calculatedForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Tariq Mahmood"
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+44 7123 456789"
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block">Glasgow Branch Pickup:</strong>
              <p className="text-[11px] text-blue-900">
                Collect cash at 22 Maxwell Road, Glasgow G41 1QE. Zero upfront payment required.
              </p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-tight">
            {REGULATORY_DETAILS.bureauDisclosure}
          </p>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
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
