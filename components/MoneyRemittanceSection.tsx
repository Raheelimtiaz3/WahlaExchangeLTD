'use client';

import React, { useState } from 'react';
import { REMITTANCE_CORRIDORS, REGULATORY_DETAILS } from '@/lib/remittance-data';
import { RemittanceCorridor } from '@/lib/types';
import { Send, ShieldCheck, CheckCircle2, Clock, Globe2, ArrowRight } from 'lucide-react';

interface MoneyRemittanceSectionProps {
  onOpenRemittanceModal: (sendAmount?: number, corridorCode?: string) => void;
}

export const MoneyRemittanceSection: React.FC<MoneyRemittanceSectionProps> = ({
  onOpenRemittanceModal,
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<RemittanceCorridor>(REMITTANCE_CORRIDORS[0]);
  const [sendGbp, setSendGbp] = useState<number>(1000);

  const calculateReceive = (corridor: RemittanceCorridor, amount: number) => {
    return amount * corridor.ratePerGbp;
  };

  return (
    <section id="remittance" className="py-12 bg-white text-[#172033] rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider inline-block mb-2 border border-blue-200">
            WAHLA MONEY • Primary Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            International Money Remittance
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Send money internationally with a simple, transparent, and reliable service provided by Wahla Exchange Ltd as a registered agent (FCA FRN {REGULATORY_DETAILS.fcaAgentFrn}).
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>FCA Agent FRN: {REGULATORY_DETAILS.fcaAgentFrn}</span>
        </div>
      </div>

      {/* Main Grid: Interactive Remittance Estimator & Supported Corridors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Remittance Calculator Card */}
        <div className="lg:col-span-6 bg-[#F6F8FA] p-6 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#172033]">Remittance Calculator</h3>
            <span className="text-xs font-semibold text-slate-500">Live Quote Engine</span>
          </div>

          <div className="space-y-4">
            
            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                You Send (GBP)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-black text-slate-900 text-lg">£</span>
                <input
                  type="number"
                  value={sendGbp}
                  onChange={(e) => setSendGbp(Math.max(10, parseFloat(e.target.value) || 0))}
                  className="w-full pl-9 pr-20 py-3.5 bg-white border border-slate-300 rounded-xl text-xl font-black text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  min="10"
                />
                <span className="absolute right-3 font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200">
                  GBP
                </span>
              </div>
            </div>

            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5">
                Destination Country
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REMITTANCE_CORRIDORS.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCorridor(c)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      selectedCorridor.code === c.code
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <img src={c.flag} alt={c.country} className="w-5 h-3.5 rounded object-cover shrink-0" />
                    <span className="truncate">{c.country}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Transfer Amount:</span>
                <strong className="text-slate-900 font-bold">£{sendGbp.toFixed(2)} GBP</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Transfer Fee:</span>
                <strong className="text-emerald-600 font-bold">£{selectedCorridor.feeGbp.toFixed(2)} GBP</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span>Customer Exchange Rate:</span>
                <strong className="text-slate-900 font-bold">
                  1 GBP = {selectedCorridor.ratePerGbp.toFixed(2)} {selectedCorridor.currencyCode}
                </strong>
              </div>
              <div className="flex justify-between items-center py-1 text-slate-700">
                <span>Estimated Speed:</span>
                <span className="font-semibold text-blue-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedCorridor.estimatedTime}
                </span>
              </div>
            </div>

            {/* Total Recipient Receives */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 block">Recipient Receives</span>
                <span className="text-2xl font-black text-blue-950">
                  {calculateReceive(selectedCorridor, sendGbp).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
              <span className="text-sm font-extrabold text-blue-900 bg-blue-100 px-3 py-1.5 rounded-lg">
                {selectedCorridor.currencyCode}
              </span>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenRemittanceModal(sendGbp, selectedCorridor.code)}
              className="w-full py-3.5 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Start Remittance Transfer</span>
            </button>

          </div>
        </div>

        {/* Right: Supported Corridors Overview & Payout Options */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-lg font-bold text-[#172033] flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-blue-600" />
            <span>Supported Transfer Corridors</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REMITTANCE_CORRIDORS.map((corridor) => (
              <div
                key={corridor.code}
                onClick={() => {
                  setSelectedCorridor(corridor);
                  onOpenRemittanceModal(sendGbp, corridor.code);
                }}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={corridor.flag} alt={corridor.country} className="w-6 h-4 rounded object-cover shadow-xs" />
                    <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {corridor.country}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {corridor.currencyCode}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex justify-between">
                  <span>Rate:</span>
                  <strong className="text-slate-900">1 GBP = {corridor.ratePerGbp} {corridor.currencyCode}</strong>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                  <span>Payouts: {corridor.payoutMethods.join(', ')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1F33] text-white space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Regulatory Transparency</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {REGULATORY_DETAILS.remittanceDisclosure}
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
