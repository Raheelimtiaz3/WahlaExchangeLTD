'use client';

import React, { useState } from 'react';
import { CurrencyReservation } from '@/lib/types';
import { STORE_BRANCHES } from '@/lib/currency-data';
import { X, Ticket, CheckCircle2, MapPin, Calendar, Clock, ShieldCheck, User, Phone, Mail } from 'lucide-react';

interface CurrencyReserveModalProps {
  initialData?: {
    currencyCode: string;
    currencyName: string;
    flag: string;
    amountForeign: number;
    amountLocal: number;
    type: 'buy' | 'sell';
    rate: number;
  } | null;
  onClose: () => void;
  onConfirmReservation: (reservation: CurrencyReservation) => void;
}

export default function CurrencyReserveModal({
  initialData,
  onClose,
  onConfirmReservation,
}: CurrencyReserveModalProps) {
  const code = initialData?.currencyCode || 'EUR';
  const name = initialData?.currencyName || 'Euro';
  const flag = initialData?.flag || '🇪🇺';
  const rate = initialData?.rate || 0.918;

  const [amountUsd, setAmountUsd] = useState<number>(initialData?.amountLocal || 500);
  const [pickupBranch, setPickupBranch] = useState<string>(STORE_BRANCHES[0].id);
  
  // Tomorrow's date default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState<string>(defaultDate);
  const [pickupTime, setPickupTime] = useState<string>('11:00 AM');
  
  const [nameInput, setNameInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string>('');

  const calculatedForeign = parseFloat((amountUsd * rate).toFixed(2));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !phoneInput.trim()) {
      setErrorMsg('Please enter your full name and phone number for pickup verification.');
      return;
    }

    const selectedBranchObj = STORE_BRANCHES.find((b) => b.id === pickupBranch) || STORE_BRANCHES[0];

    const voucher: CurrencyReservation = {
      id: `VCH-${Math.floor(100000 + Math.random() * 900000)}`,
      currencyCode: code,
      currencyName: name,
      flag: flag,
      amountForeign: calculatedForeign,
      amountLocal: amountUsd,
      type: initialData?.type || 'buy',
      exchangeRate: rate,
      pickupLocation: selectedBranchObj.name,
      pickupDate: pickupDate,
      pickupTime: pickupTime,
      customerName: nameInput,
      customerPhone: phoneInput,
      customerEmail: emailInput,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      qrCodeSeed: `VOUCHER-${code}-${amountUsd}-${Date.now()}`,
    };

    onConfirmReservation(voucher);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative space-y-6 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  Reserve {code} Currency Voucher
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                  Rate Lock Guaranteed
                </span>
              </div>
              <p className="text-xs text-slate-400">
                0% commission fee locked for 48 hours
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

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount & Lock Rate Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Amount Paid (USD)</span>
              <span>Foreign Cash Received ({code})</span>
            </div>

            <div className="flex justify-between items-center font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">$</span>
                <input
                  type="number"
                  min="20"
                  value={amountUsd}
                  onChange={(e) => setAmountUsd(Number(e.target.value))}
                  className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <span className="text-xl font-extrabold text-amber-400">
                {flag} {calculatedForeign.toLocaleString()} {code}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span>Rate: 1 USD = {rate} {code}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> No Price Slip Protection
              </span>
            </div>
          </div>

          {/* Pickup Store Branch */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              Select Store Branch Counter
            </label>
            <select
              value={pickupBranch}
              onChange={(e) => setPickupBranch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {STORE_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.queueWaitTime} wait)
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" />
                Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Time Window
              </label>
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="09:00 AM">09:00 AM - 12:00 PM</option>
                <option value="12:00 PM">12:00 PM - 03:00 PM</option>
                <option value="03:00 PM">03:00 PM - 06:00 PM</option>
                <option value="06:00 PM">06:00 PM - 09:00 PM</option>
                <option value="24/7 Airport">24/7 Airport Express</option>
              </select>
            </div>
          </div>

          {/* Customer Verification Form */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Verification Details
            </div>

            <div className="space-y-2">
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Full Name (Matches Passport / ID)"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="Mobile Phone"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email (for QR Voucher)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-950/40"
          >
            <Ticket className="w-4 h-4" />
            <span>Generate & Confirm Pickup Voucher</span>
          </button>
        </form>
      </div>
    </div>
  );
}
