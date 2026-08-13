'use client';

import React from 'react';
import { Send, CheckCircle2, ShieldCheck, ArrowRight, Wallet } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Start Your Transfer',
      description: 'Select your recipient country, transfer amount in GBP, and preferred payout method (Bank Deposit, Cash Pickup, or Mobile Wallet).',
      icon: <Send className="w-5 h-5 text-blue-600" />,
    },
    {
      step: '02',
      title: 'Confirm Rate & Details',
      description: 'Review the transparent exchange rate, transfer fee, and exact amount your recipient will receive. Zero hidden charges.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      step: '03',
      title: 'Make Payment',
      description: 'Complete your transfer payment via online bank transfer or in person at our Glasgow counter (22 Maxwell Road, Glasgow).',
      icon: <Wallet className="w-5 h-5 text-blue-700" />,
    },
    {
      step: '04',
      title: 'Transfer Processed',
      description: 'Funds are dispatched to your recipient with instant SMS / email transaction confirmation and reference tracking.',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider inline-block border border-slate-200">
          Simple 4-Step Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
          How Money Remittance Works
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          A clear, compliant, and straightforward process from quote to recipient payout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 hover:border-blue-400 transition-all space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-blue-600 font-mono">
                {item.step}
              </span>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                {item.icon}
              </div>
            </div>

            <h3 className="text-base font-extrabold text-[#172033]">
              {item.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};
