'use client';

import React from 'react';
import { ArrowRight, Lock, MapPin, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  onExploreRates: () => void;
  onExplorePhones: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreRates, onExplorePhones }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-[#0A0F1D] via-[#0F172A] to-[#0A0F1D]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-extrabold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Glasgow Counter • 22 Maxwell Road, G41 1QE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Zero-Commission <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Currency Exchange</span> & Unlocked Smartphones
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Lock live exchange rates online for 0% commission counter pickup in Glasgow, or purchase certified unlocked iPhones, Samsung Galaxy flagships, and GaN travel chargers for your next journey.
            </p>

            {/* Value Props Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#131B2E] border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% Commission</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#131B2E] border border-slate-700/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rate Lock Voucher</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#131B2E] border border-slate-700/60 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certified Unlocked</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onExploreRates}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Lock Live Exchange Rates</span>
              </button>

              <button
                onClick={onExplorePhones}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#131B2E] hover:bg-slate-800 border border-slate-700/80 text-slate-100 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Shop Smartphones & Tech</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Right Column Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#131D33] to-[#0D1424] p-6 border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">WAHLA STORE LIVE</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#090E1B] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Popular Exchange</span>
                  <div className="text-base font-black text-white flex items-center gap-2 mt-0.5">
                    <span>1000 GBP → 1282.00 USD</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-black text-xs">
                  0% Fee
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#090E1B] border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Featured Smartphone</span>
                  <div className="text-base font-black text-white mt-0.5">
                    iPhone 16 Pro Max <span className="text-emerald-400 text-sm">£1,199</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs">
                  In Stock
                </span>
              </div>

              <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Counter Pickup: 22 Maxwell Road, Glasgow, G41 1QE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;

