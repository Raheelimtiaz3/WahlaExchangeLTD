'use client';

import React from 'react';
import { REGULATORY_DETAILS } from '@/lib/remittance-data';
import { ShieldCheck, Lock, Eye, Building2, PhoneCall, ExternalLink } from 'lucide-react';

export const SecurityTrustSection: React.FC = () => {
  const trustCards = [
    {
      title: 'Secure Processes',
      description: 'Professional transaction processes, strict Anti-Money Laundering (AML) controls, and verified identity handling.',
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      badge: 'Protected',
    },
    {
      title: '100% Transparent',
      description: 'Clear customer exchange rates, explicit fee breakdowns, and zero hidden markups across all transactions.',
      icon: <Eye className="w-6 h-6 text-emerald-600" />,
      badge: 'Zero Hidden Fees',
    },
    {
      title: 'Regulated Payment Agent',
      description: `Money remittance services provided as a registered PSD Agent (FCA FRN: ${REGULATORY_DETAILS.fcaAgentFrn}) of Noble Travel & Money Exchange Ltd (FRN: ${REGULATORY_DETAILS.principalFrn}).`,
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      badge: 'FCA Agent 1061169',
    },
    {
      title: 'Local Glasgow Support',
      description: 'In-person consultations, cash collections, and dedicated customer phone support from our team at 22 Maxwell Road, Glasgow.',
      icon: <PhoneCall className="w-6 h-6 text-slate-800" />,
      badge: '0141 266 0379',
    },
  ];

  return (
    <section className="py-12 bg-[#F6F8FA] rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider inline-block">
          Trust & Compliance Framework
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
          Your Money. Your Trust. Our Responsibility.
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          We operate with strict regulatory transparency, local accountability, and customer-first integrity.
        </p>
      </div>

      {/* Grid of 4 Trust Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustCards.map((card, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {card.icon}
                </div>
                <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  {card.badge}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#172033]">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Direct Callout */}
      <div className="p-5 rounded-2xl bg-[#0B1F33] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Wahla Exchange Ltd on the Official FCA Register</span>
          </h4>
          <p className="text-xs text-slate-300">
            FCA FRN: {REGULATORY_DETAILS.fcaAgentFrn} • Principal Firm: Noble Travel and Money Exchange Ltd (FRN: {REGULATORY_DETAILS.principalFrn})
          </p>
        </div>

        <a
          href={REGULATORY_DETAILS.fcaRegisterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shrink-0 flex items-center gap-1.5 shadow-md border border-blue-400/30"
        >
          <span>Verify on FCA Register</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </section>
  );
};
