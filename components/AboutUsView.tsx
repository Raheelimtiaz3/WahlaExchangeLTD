'use client';

import React from 'react';
import { REGULATORY_DETAILS, GLASGOW_BRANCH } from '@/lib/remittance-data';
import { Building2, ShieldCheck, HeartHandshake, Eye, MapPin, Users } from 'lucide-react';

export const AboutUsView: React.FC = () => {
  return (
    <div id="about-us" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider inline-block">
          About Wahla Exchange Ltd
        </span>
        <h1 className="text-3xl font-extrabold text-[#172033]">
          Trusted UK Financial Services & Local Counter Care
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
          Wahla Exchange Ltd is a trusted UK-based business providing international money remittance, foreign currency exchange, and selected retail technology products from our Glasgow store hub.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-[#172033]">
            Rate Transparency
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We believe financial services should be clear and predictable. We disclose customer exchange rates and transfer fees upfront with zero hidden surprises.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-[#172033]">
            Compliance Culture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our money remittance service operates under a PSD Agent model (FCA FRN: {REGULATORY_DETAILS.fcaAgentFrn}) of Noble Travel and Money Exchange Ltd, adhering strictly to UK AML guidelines.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-extrabold text-[#172033]">
            Local Community Presence
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Located at 22 Maxwell Road, Pollokshields, Glasgow, we offer face-to-face assistance, instant cash collections, and dedicated telephone support.
          </p>
        </div>

      </div>

      {/* Corporate Summary Box */}
      <div className="p-6 rounded-2xl bg-[#0B1F33] text-white space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-bold text-white">
            Corporate Architecture & Brand Structure
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 pt-2">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-blue-400 block font-bold text-sm">WAHLA MONEY</strong>
            <p className="text-white font-semibold">International Money Remittance</p>
            <p className="text-[11px] text-slate-400">
              PSD Agent FRN: {REGULATORY_DETAILS.fcaAgentFrn} • Principal: Noble Travel & Money Exchange Ltd (FRN: {REGULATORY_DETAILS.principalFrn})
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-emerald-400 block font-bold text-sm">WAHLA FX</strong>
            <p className="text-white font-semibold">Foreign Currency Exchange</p>
            <p className="text-[11px] text-slate-400">
              Bureau de Change via arrangements with Sia Trade Ltd (Registered with HMRC for MLR purposes)
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
            <strong className="text-cyan-400 block font-bold text-sm">WAHLA TECH</strong>
            <p className="text-white font-semibold">Mobile Phones & Tech Retail</p>
            <p className="text-[11px] text-slate-400">
              Unlocked smartphones, travel powerbanks, fast GaN chargers & accessories at Glasgow branch
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
