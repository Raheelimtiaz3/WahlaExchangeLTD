'use client';

import React, { useState } from 'react';
import { REGULATORY_DETAILS, REMITTANCE_CORRIDORS } from '@/lib/remittance-data';
import { ShieldCheck, ArrowRight, Lock, CheckCircle2, Building2, HelpCircle } from 'lucide-react';

interface HeroSectionProps {
  onSendMoneyClick: (amountGbp?: number, corridorCode?: string) => void;
  onExploreFxClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSendMoneyClick,
  onExploreFxClick,
}) => {
  const [sendGbp, setSendGbp] = useState<number>(500);
  const [selectedCorridorCode, setSelectedCorridorCode] = useState<string>('PKR');

  const selectedCorridor =
    REMITTANCE_CORRIDORS.find((c) => c.code === selectedCorridorCode) || REMITTANCE_CORRIDORS[0];

  const calculatedReceive = sendGbp * selectedCorridor.ratePerGbp;

  return (
    <section className="bg-[#0B1F33] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Core Value Proposition */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Regulated Agent Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>FCA Agent FRN: {REGULATORY_DETAILS.fcaAgentFrn}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Principal FRN: {REGULATORY_DETAILS.principalFrn}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Send Money Worldwide. <br />
            <span className="text-blue-400">Simply. Securely.</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            International money remittance and foreign currency exchange from <strong>Wahla Exchange Ltd</strong>. Enjoy transparent exchange rates, clear fees, and real customer support in Glasgow.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSendMoneyClick(sendGbp, selectedCorridorCode)}
              className="px-6 py-3.5 bg-[#155EEF] hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer border border-blue-400/30"
            >
              <span>Send Money</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreFxClick}
              className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Exchange Rate</span>
            </button>
          </div>

          {/* Key Trust Points */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Registered PSD Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Glasgow Counter Pickup</span>
            </div>
          </div>

        </div>

        {/* Right Column: Quick Remittance Quote Widget */}
        <div className="lg:col-span-5">
          <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-5 relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  WAHLA MONEY
                </span>
                <h2 className="text-xl font-bold text-[#172033]">Quick Transfer Quote</h2>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-200/80">
                Transparent Rate
              </span>
            </div>

            <div className="space-y-3">
              
              {/* You Send GBP */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-blue-500 transition-colors">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-1">
                  <span>You Send</span>
                  <span>Currency: GBP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900">£</span>
                  <input
                    type="number"
                    value={sendGbp}
                    onChange={(e) => setSendGbp(Math.max(10, parseFloat(e.target.value) || 0))}
                    className="w-full text-right text-xl font-black bg-transparent focus:outline-none text-slate-900"
                    min="10"
                  />
                  <span className="ml-2 font-bold text-xs bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg shrink-0">
                    GBP (£)
                  </span>
                </div>
              </div>

              {/* Destination Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Recipient Destination
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {REMITTANCE_CORRIDORS.slice(0, 4).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCorridorCode(c.code)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                        selectedCorridorCode === c.code
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <img src={c.flag} alt={c.country} className="w-5 h-3.5 rounded object-cover shrink-0" />
                      <span className="truncate">{c.country}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee & Exchange Rate Summary */}
              <div className="p-3.5 rounded-xl bg-slate-100/80 space-y-1.5 text-xs text-slate-600 border border-slate-200">
                <div className="flex justify-between">
                  <span>Exchange Rate:</span>
                  <strong className="text-slate-900 font-bold">
                    1 GBP = {selectedCorridor.ratePerGbp.toFixed(2)} {selectedCorridor.currencyCode}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <strong className="text-emerald-600 font-bold">
                    £{selectedCorridor.feeGbp.toFixed(2)} GBP
                  </strong>
                </div>
              </div>

              {/* Recipient Receives */}
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
                <span className="text-xs font-semibold text-blue-700 block mb-0.5">
                  Recipient Receives
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-900">
                    {calculatedReceive.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                  <span className="font-extrabold text-sm text-blue-800 bg-blue-100 px-3 py-1 rounded-lg">
                    {selectedCorridor.currencyCode}
                  </span>
                </div>
              </div>

            </div>

            {/* Submit CTA */}
            <button
              onClick={() => onSendMoneyClick(sendGbp, selectedCorridorCode)}
              className="w-full py-4 bg-[#155EEF] hover:bg-blue-600 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Continue Money Transfer</span>
            </button>

            <p className="text-[11px] text-center text-slate-500 font-medium">
              Transfers processed via Registered Agent FRN {REGULATORY_DETAILS.fcaAgentFrn}
            </p>

          </div>
        </div>

      </div>

      {/* Regulatory Trust Strip Underneath Hero */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs text-slate-300">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-2 text-white font-bold">
            <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Money Remittance Status</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {REGULATORY_DETAILS.remittanceDisclosure}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Currency Exchange Status</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            {REGULATORY_DETAILS.bureauDisclosure}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-2 text-white font-bold">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Glasgow Branch Service</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            In-person cash pickups and customer consultations at 22 Maxwell Road, Pollokshields, Glasgow G41 1QE.
          </p>
        </div>
      </div>

    </section>
  );
};
