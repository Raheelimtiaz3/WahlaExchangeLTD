'use client';

import React from 'react';
import { CurrencyReservation } from '@/lib/types';
import { X, Printer, CheckCircle2, QrCode, ShieldCheck, Download, Banknote, MapPin } from 'lucide-react';

interface ReceiptModalProps {
  reservation?: CurrencyReservation | null;
  orderData?: {
    orderId: string;
    itemsCount: number;
    total: number;
    discount: number;
    date: string;
  } | null;
  onClose: () => void;
}

export default function ReceiptModal({
  reservation,
  orderData,
  onClose,
}: ReceiptModalProps) {
  if (!reservation && !orderData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative space-y-6 p-6 sm:p-8 print:p-0 print:border-none print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-bold text-white">
              Official Digital Voucher / Receipt
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#16191E] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Area */}
        <div className="p-5 rounded-2xl bg-[#16191E] border border-slate-800 space-y-5 print:bg-white print:text-black">
          {/* Store Brand Header */}
          <div className="text-center border-b border-dashed border-slate-800 print:border-slate-300 pb-4">
            <h2 className="text-lg font-light tracking-wider text-white print:text-black">
              WAHLA EXCHANGE LTD
            </h2>
            <p className="text-[11px] text-slate-400 print:text-slate-600 mt-0.5">
              Official Foreign Exchange & Unlocked Tech Counter
            </p>
            <div className="text-[10px] text-teal-400 print:text-slate-900 font-mono font-bold mt-1">
              {reservation ? `VOUCHER #: ${reservation.id}` : `ORDER #: ${orderData?.orderId}`}
            </div>
          </div>

          {/* Reservation / Order Breakdown */}
          {reservation ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0F1115] print:bg-slate-100 border border-slate-800/80">
                <span className="text-slate-400 print:text-slate-600">Reserved Currency:</span>
                <span className="font-extrabold text-white print:text-black font-mono text-sm">
                  {reservation.flag} {reservation.amountForeign} {reservation.currencyCode}
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#0F1115] print:bg-slate-100 border border-slate-800/80">
                <span className="text-slate-400 print:text-slate-600">Amount Paid (USD):</span>
                <span className="font-bold text-teal-400 print:text-slate-900 font-mono">
                  ${reservation.amountLocal} USD
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600">Guaranteed Rate:</span>
                <span className="font-mono text-slate-200 print:text-black">
                  1 USD = {reservation.exchangeRate} {reservation.currencyCode}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600">Pickup Counter:</span>
                <span className="font-semibold text-slate-200 print:text-black text-right max-w-[180px]">
                  {reservation.pickupLocation}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600">Date & Time:</span>
                <span className="font-mono text-slate-200 print:text-black">
                  {reservation.pickupDate} ({reservation.pickupTime})
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-800 print:border-slate-300 pt-2">
                <span className="text-slate-400 print:text-slate-600">Customer Name:</span>
                <span className="font-bold text-slate-100 print:text-black">
                  {reservation.customerName}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0F1115] print:bg-slate-100 border border-slate-800/80">
                <span className="text-slate-400 print:text-slate-600">Total Items:</span>
                <span className="font-bold text-white print:text-black">
                  {orderData?.itemsCount} Items
                </span>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-[#0F1115] print:bg-slate-100 border border-slate-800/80">
                <span className="text-slate-400 print:text-slate-600">Total Amount Paid:</span>
                <span className="font-mono font-extrabold text-teal-400 print:text-black text-sm">
                  ${orderData?.total} USD
                </span>
              </div>

              <div className="flex justify-between text-slate-400 print:text-slate-600">
                <span>Transaction Date:</span>
                <span className="font-mono text-slate-200 print:text-black">
                  {orderData?.date}
                </span>
              </div>
            </div>
          )}

          {/* QR Code Graphic Placeholder */}
          <div className="p-4 rounded-xl bg-white flex flex-col items-center justify-center space-y-2 border border-slate-200">
            <div className="p-2 bg-black rounded-lg">
              <QrCode className="w-24 h-24 text-white" />
            </div>
            <p className="text-[10px] text-slate-700 font-mono font-bold tracking-widest uppercase">
              SCAN AT COUNTER FOR EXPRESS SERVICE
            </p>
          </div>

          <div className="text-[10px] text-center text-slate-400 print:text-slate-600 font-mono">
            Zero Commission Guaranteed • Show Government Issued ID
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black text-xs font-extrabold flex items-center justify-center gap-2 transition-colors shadow-md uppercase tracking-wider"
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
