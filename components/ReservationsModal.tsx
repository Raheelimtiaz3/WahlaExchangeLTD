'use client';

import React from 'react';
import { CurrencyReservation } from '@/lib/types';
import { X, Ticket, Calendar, MapPin, Trash2, Eye, ShieldCheck } from 'lucide-react';

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: CurrencyReservation[];
  onViewVoucher: (res: CurrencyReservation) => void;
  onCancelReservation: (id: string) => void;
}

export default function ReservationsModal({
  isOpen,
  onClose,
  reservations,
  onViewVoucher,
  onCancelReservation,
}: ReservationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative space-y-5 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Your Reserved Vouchers</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#16191E] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {reservations.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Ticket className="w-10 h-10 mx-auto text-slate-700" />
              <p className="text-xs font-medium">No active currency pickup reservations found.</p>
              <p className="text-[11px] text-slate-600">Lock in rates anytime using our Currency Converter above!</p>
            </div>
          ) : (
            reservations.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-[#16191E] border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{res.flag}</span>
                    <div>
                      <div className="text-sm font-extrabold text-white">
                        {res.amountForeign} {res.currencyCode} (${res.amountLocal} USD)
                      </div>
                      <span className="text-[11px] font-mono text-teal-400">
                        Voucher ID: {res.id}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[10px] font-bold">
                    {res.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{res.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{res.pickupDate} ({res.pickupTime})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => onCancelReservation(res.id)}
                    className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Cancel Reservation
                  </button>

                  <button
                    onClick={() => onViewVoucher(res)}
                    className="px-3 py-1.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Voucher QR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
