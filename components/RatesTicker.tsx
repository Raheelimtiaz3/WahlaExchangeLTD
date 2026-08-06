'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { ArrowUpRight, ArrowDownRight, Sparkles, ShieldCheck, Clock, Zap } from 'lucide-react';

export default function RatesTicker() {
  const [timeString, setTimeString] = useState<string>('');
  const [activeAnnounceIndex, setActiveAnnounceIndex] = useState(0);

  // Repeat initial currencies 4 times to ensure seamless infinite looping marquee
  const tickerItems = [
    ...INITIAL_CURRENCIES,
    ...INITIAL_CURRENCIES,
    ...INITIAL_CURRENCIES,
    ...INITIAL_CURRENCIES,
  ];

  const announcements = [
    { icon: <ShieldCheck className="w-3 h-3 text-teal-400" />, text: "0% Commission Guaranteed" },
    { icon: <Zap className="w-3 h-3 text-amber-400" />, text: "Instant Rate Lock Voucher" },
    { icon: <Clock className="w-3 h-3 text-emerald-400" />, text: "Counter Open 7 Days" },
  ];

  useEffect(() => {
    // Clock update
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/London',
        })
      );
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Announcement rotator
    const announceInterval = setInterval(() => {
      setActiveAnnounceIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(announceInterval);
    };
  }, [announcements.length]);

  return (
    <div className="bg-[#0A0C0F] text-slate-200 border-b border-slate-800/80 text-xs py-2 overflow-hidden select-none relative z-40">
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-3">
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 shrink-0 pr-3 sm:pr-4 bg-[#0A0C0F] z-10 border-r border-slate-800/80">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
          </span>
          <span className="font-extrabold text-teal-400 uppercase tracking-[0.18em] text-[10px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-400 animate-pulse" />
            <span className="hidden xs:inline">LIVE</span> RATES
          </span>
          {timeString && (
            <span className="hidden lg:inline text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
              {timeString} UK
            </span>
          )}
        </div>

        {/* Continuous Animated Marquee Ticker */}
        <div className="overflow-hidden whitespace-nowrap flex-1 relative flex items-center">
          {/* Left/Right Fade Gradients for smooth transition */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0A0C0F] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A0C0F] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-6 sm:gap-8 cursor-pointer">
            {tickerItems.map((curr, idx) => {
              const isPositive = curr.change24h >= 0;
              const isTopPair = curr.code === 'GBP' || curr.code === 'EUR' || curr.code === 'SAR';

              return (
                <div
                  key={`${curr.code}-${idx}`}
                  className="inline-flex items-center gap-2 font-medium bg-[#13161C]/70 hover:bg-[#1C212B] px-2.5 py-1 rounded-xl border border-slate-800/70 hover:border-teal-500/50 transition-all shadow-sm group"
                >
                  <span className="text-sm sm:text-base leading-none group-hover:scale-110 transition-transform">
                    {curr.flag}
                  </span>

                  <span className="text-white font-bold text-xs tracking-wide">
                    {curr.code}<span className="text-slate-500 font-normal">/USD</span>
                  </span>

                  <span className="text-teal-400 font-mono font-bold text-xs">
                    ${curr.midRate}
                  </span>

                  <span
                    className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                      isPositive
                        ? 'text-teal-300 bg-teal-950/70 border border-teal-500/30'
                        : 'text-rose-300 bg-rose-950/70 border border-rose-500/30'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3 mr-0.5 inline text-teal-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-0.5 inline text-rose-400" />
                    )}
                    {isPositive ? '+' : ''}
                    {curr.change24h}%
                  </span>

                  {isTopPair && idx % 3 === 0 && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      BEST BUY
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Live Announcement Rotator Badge */}
        <div className="hidden md:flex items-center gap-2 shrink-0 pl-3 sm:pl-4 bg-[#0A0C0F] z-10 border-l border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#13161C] border border-slate-800 text-slate-300 font-medium transition-all duration-300">
            {announcements[activeAnnounceIndex].icon}
            <span className="text-teal-300 font-semibold">
              {announcements[activeAnnounceIndex].text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

