'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  ExternalLink
} from 'lucide-react';

export default function RightCornerWidgets() {
  const [isWaOpen, setIsWaOpen] = useState(false);

  // WhatsApp launcher link generator
  const getWaLink = (customText?: string) => {
    const text = encodeURIComponent(
      customText || 'Hi Wahla Exchange LTD! I would like to inquire about foreign currency rates and phone services.'
    );
    return `https://wa.me/441412660379?text=${text}`;
  };

  return (
    <div className="fixed bottom-20 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2.5 max-w-[calc(100vw-1.5rem)] pointer-events-none">
      {/* ----------------- WHATSAPP QUICK DRAWER / POPUP ----------------- */}
      {isWaOpen && (
        <div className="pointer-events-auto w-[calc(100vw-1.5rem)] sm:w-[340px] bg-[#0F1115] border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 sm:pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500 text-black font-bold shadow-md shadow-emerald-950/40">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  WhatsApp Support
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">+44 1412660379 (Glasgow, UK)</p>
              </div>
            </div>
            <button
              onClick={() => setIsWaOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <p className="text-slate-400 text-[11px] sm:text-xs">
              Need immediate rate quotes, custom currency reservations, or device trade-in appraisals? Contact our counter directly on WhatsApp:
            </p>

            <div className="space-y-1.5 pt-1">
              <a
                href={getWaLink('Hi! I want to reserve foreign currency rates.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#16191E] hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-semibold text-slate-200 transition-colors group"
              >
                <span>💱 Reserve Currency Rates</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </a>

              <a
                href={getWaLink('Hi! I want a phone trade-in instant cash quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#16191E] hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-semibold text-slate-200 transition-colors group"
              >
                <span>📱 Phone Trade-in Quote</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </a>

              <a
                href={getWaLink('Hi! What are your store counter hours in Glasgow?')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#16191E] hover:bg-emerald-950/30 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-semibold text-slate-200 transition-colors group"
              >
                <span>📍 Glasgow Store Counter Hours</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
              </a>
            </div>
          </div>

          <a
            href={getWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-950/50 uppercase tracking-wider"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* ----------------- WHATSAPP FLOATING TRIGGER BUTTON ----------------- */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        <div className="relative group">
          <button
            onClick={() => setIsWaOpen(!isWaOpen)}
            className={`relative flex items-center justify-center p-3.5 sm:p-4 rounded-full font-bold transition-all shadow-2xl transform active:scale-95 border ${
              isWaOpen
                ? 'bg-emerald-400 text-black border-emerald-200 shadow-emerald-500/40 ring-2 ring-emerald-400/60'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50 shadow-emerald-950/70 hover:scale-105'
            }`}
            title="WhatsApp Support (+44 1412660379)"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
          </button>

          {/* Tooltip Label */}
          <span className="hidden sm:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-bold text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            WhatsApp Support
          </span>
        </div>
      </div>
    </div>
  );
}
