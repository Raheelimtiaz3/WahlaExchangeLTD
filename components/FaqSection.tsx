'use client';

import React, { useState } from 'react';
import { FREQUENT_QUESTIONS } from '@/lib/remittance-data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider inline-block border border-slate-200">
          Regulatory & Service Clarity
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Clear answers regarding our money remittance agent model, currency exchange, and branch services.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FREQUENT_QUESTIONS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-[#F6F8FA]"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-4.5 text-left font-bold text-sm text-[#172033] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  {faq.q}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>

              {isOpen && (
                <div className="p-4.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
