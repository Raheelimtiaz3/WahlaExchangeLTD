'use client';

import React from 'react';
import { ReservationVoucher } from '@/lib/types';
import { X, Ticket, CheckCircle2, MapPin, Printer } from 'lucide-react';

interface ReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: ReservationVoucher[];
}

export const ReservationsModal: React.FC<ReservationsModalProps> = ({ isOpen, onClose, vouchers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#14171F] border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-black text-white">Your Currency Vouchers</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {vouchers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold">No active rate vouchers found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Lock live exchange rates using the calculator to generate instant counter pickup vouchers.
              </p>
            </div>
          ) : (
            vouchers.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-[#0B0D12] border border-teal-900/60 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-teal-400">VOUCHER ID: {v.id}</span>
                  <span className="px-2 py-0.5 text-[10px] bg-teal-950 text-teal-300 font-extrabold rounded border border-teal-800">
                    {v.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Currency & Amount</span>
                    <strong className="text-base text-white font-black">
                      {v.amountForeign.toLocaleString(undefined, { maximumFractionDigits: 2 })} {v.currencyCode}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">GBP Cost (0% Fee)</span>
                    <strong className="text-base text-teal-400 font-black">£{v.costGbp.toFixed(2)} GBP</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span>Name: <strong className="text-white">{v.customerName}</strong></span>
                  <span>Pickup: <strong className="text-white">22 Maxwell Rd, Glasgow</strong></span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ReservationsModal;

