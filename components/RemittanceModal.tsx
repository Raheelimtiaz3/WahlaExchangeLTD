'use client';

import React, { useState } from 'react';
import { REMITTANCE_CORRIDORS, REGULATORY_DETAILS } from '@/lib/remittance-data';
import { RemittanceTransferOrder } from '@/lib/types';
import { X, Send, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface RemittanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSendGbp?: number;
  initialCorridorCode?: string;
  onConfirmOrder: (order: RemittanceTransferOrder) => void;
}

export const RemittanceModal: React.FC<RemittanceModalProps> = ({
  isOpen,
  onClose,
  initialSendGbp = 500,
  initialCorridorCode = 'PKR',
  onConfirmOrder,
}) => {
  const [sendGbp, setSendGbp] = useState<number>(initialSendGbp);
  const [selectedCorridorCode, setSelectedCorridorCode] = useState<string>(initialCorridorCode);
  const [payoutMethod, setPayoutMethod] = useState<string>('Bank Deposit');

  // Sender details
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  // Recipient details
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientBankOrWallet, setRecipientBankOrWallet] = useState('');
  const [recipientAccountNo, setRecipientAccountNo] = useState('');

  const [step, setStep] = useState<'quote' | 'details' | 'success'>('quote');
  const [createdOrder, setCreatedOrder] = useState<RemittanceTransferOrder | null>(null);

  if (!isOpen) return null;

  const corridor =
    REMITTANCE_CORRIDORS.find((c) => c.code === selectedCorridorCode) || REMITTANCE_CORRIDORS[0];

  const calculateReceive = sendGbp * corridor.ratePerGbp;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !recipientName || !recipientPhone) return;

    const timestamp = new Date().getTime();
    const uniqueId = `WM-${timestamp.toString().slice(-6)}`;

    const newOrder: RemittanceTransferOrder = {
      id: uniqueId,
      senderName,
      senderPhone,
      senderEmail,
      recipientName,
      recipientPhone,
      recipientBankOrWallet,
      recipientAccountNo,
      destinationCountry: corridor.country,
      destinationCurrency: corridor.currencyCode,
      sendAmountGbp: sendGbp,
      transferFeeGbp: corridor.feeGbp,
      exchangeRate: corridor.ratePerGbp,
      recipientReceivesAmount: calculateReceive,
      payoutMethod,
      createdAt: new Date().toISOString(),
      status: 'PENDING_VERIFICATION',
    };

    setCreatedOrder(newOrder);
    onConfirmOrder(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 text-slate-900 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#172033]">
              Send Money Worldwide (WAHLA MONEY)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              PSD Agent FRN: {REGULATORY_DETAILS.fcaAgentFrn} • Principal FRN: {REGULATORY_DETAILS.principalFrn}
            </p>
          </div>
        </div>

        {step === 'quote' && (
          <div className="space-y-4">
            
            {/* Amount input */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Amount to Send (GBP)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 font-bold text-slate-900 text-base">£</span>
                <input
                  type="number"
                  value={sendGbp}
                  onChange={(e) => setSendGbp(Math.max(10, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-16 py-3 bg-slate-50 border border-slate-300 rounded-xl text-lg font-black text-slate-900 focus:outline-none focus:border-blue-600"
                  min="10"
                />
                <span className="absolute right-3 text-xs font-bold bg-slate-200 text-slate-800 px-2.5 py-1 rounded-md">
                  GBP
                </span>
              </div>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Select Recipient Country
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REMITTANCE_CORRIDORS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCorridorCode(c.code);
                      setPayoutMethod(c.payoutMethods[0]);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      selectedCorridorCode === c.code
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <img src={c.flag} alt={c.country} className="w-5 h-3.5 rounded object-cover" />
                    <span className="truncate">{c.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Method */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Payout Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {corridor.payoutMethods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPayoutMethod(m)}
                    className={`p-2 rounded-xl text-xs font-bold border cursor-pointer ${
                      payoutMethod === m
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee & Rate Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span>Applied Exchange Rate:</span>
                <strong className="text-slate-900 font-bold">1 GBP = {corridor.ratePerGbp} {corridor.currencyCode}</strong>
              </div>
              <div className="flex justify-between">
                <span>Transfer Fee:</span>
                <strong className="text-emerald-600 font-bold">£{corridor.feeGbp.toFixed(2)} GBP</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-black text-blue-900">
                <span>Recipient Receives:</span>
                <span>{calculateReceive.toLocaleString(undefined, { maximumFractionDigits: 2 })} {corridor.currencyCode}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('details')}
              className="w-full py-3.5 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Enter Sender & Recipient Details</span>
            </button>

          </div>
        )}

        {step === 'details' && (
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 font-medium">
              Sending <strong>£{sendGbp} GBP</strong> to <strong>{corridor.country}</strong> ({calculateReceive.toLocaleString()} {corridor.currencyCode}) via {payoutMethod}.
            </div>

            {/* Sender Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-[#172033] uppercase tracking-wider">
                1. Sender Details (UK Resident)
              </h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-600">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+44 7123 456789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Email (Optional)</label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-[#172033] uppercase tracking-wider">
                2. Recipient Details ({corridor.country})
              </h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-600">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Recipient Mobile</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Recipient phone"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600">Bank Name / Wallet</label>
                  <input
                    type="text"
                    value={recipientBankOrWallet}
                    onChange={(e) => setRecipientBankOrWallet(e.target.value)}
                    placeholder="e.g. HBL / bKash / EasyPaisa"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600">Account / IBAN / Wallet Number</label>
                <input
                  type="text"
                  value={recipientAccountNo}
                  onChange={(e) => setRecipientAccountNo(e.target.value)}
                  placeholder="Account or IBAN Number"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('quote')}
                className="w-1/3 py-3 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Submit & Generate Reference</span>
              </button>
            </div>

          </form>
        )}

        {step === 'success' && createdOrder && (
          <div className="space-y-4 py-2 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-[#172033]">
                Transfer Order Submitted
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Reference ID: <strong className="text-blue-600 font-mono text-sm">{createdOrder.id}</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-left">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Sender:</span>
                <strong className="text-slate-900">{createdOrder.senderName}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Recipient:</span>
                <strong className="text-slate-900">{createdOrder.recipientName} ({createdOrder.destinationCountry})</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Send Amount:</span>
                <strong className="text-slate-900">£{createdOrder.sendAmountGbp.toFixed(2)} GBP</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Recipient Amount:</span>
                <strong className="text-blue-700 font-bold">
                  {createdOrder.recipientReceivesAmount.toLocaleString()} {createdOrder.destinationCurrency}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  Pending Counter / Payment Verification
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Please present Reference <strong className="text-slate-900">{createdOrder.id}</strong> at our Glasgow branch (22 Maxwell Road, Glasgow G41 1QE) or call our desk at 0141 266 0379 to complete your transfer payment.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
