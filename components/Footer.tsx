'use client';

import React from 'react';
import { Banknote, Smartphone, ShieldCheck, MapPin, PhoneCall, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#070A14] border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 p-0.5 shadow-md flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-emerald-400 absolute -translate-x-1 -translate-y-1" />
                  <Smartphone className="w-4 h-4 text-emerald-300 absolute translate-x-1 translate-y-1" />
                </div>
              </div>
              <span className="font-light tracking-wide text-lg text-white font-sans">
                WAHLA <span className="text-emerald-400 font-normal">EXCHANGE</span> <span className="text-white font-normal">LTD</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Your premier licensed currency exchange counter & authorized unlocked smartphone trader. Zero commission fees on foreign cash notes, instant phone trade-in quotes, and global travel eSIMs.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Licensed Bureau
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0% Hidden Markup
              </span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-xs">
              Currency Exchange
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#currency" className="hover:text-emerald-400 transition-colors">Instant Currency Calculator</a></li>
              <li><a href="#currency" className="hover:text-emerald-400 transition-colors">Today&apos;s Exchange Rates</a></li>
              <li><a href="#currency" className="hover:text-emerald-400 transition-colors">Reserve Currency Voucher</a></li>
              <li><a href="#ai-advisor" className="hover:text-emerald-400 transition-colors">AI Travel Cash Advice</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-xs">
              Smartphones & Accessories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#phones" className="hover:text-emerald-400 transition-colors">Unlocked iPhone & Galaxy</a></li>
              <li><a href="#tradein" className="hover:text-emerald-400 transition-colors">Phone Trade-In Calculator</a></li>
              <li><a href="#accessories" className="hover:text-emerald-400 transition-colors">65W Travel Fast Chargers</a></li>
              <li><a href="#accessories" className="hover:text-emerald-400 transition-colors">Global Travel eSIM Passes</a></li>
            </ul>
          </div>

          {/* Counter Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-[0.15em] text-xs">
              Store Counter & Contact
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>22 Maxwell Road, Glasgow, G41 1QE, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline: +44 1412660379</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Glasgow Hub: Mon-Sat 8am - 9pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Wahla Exchange LTD. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Exchange Terms</span>
            <span className="hover:text-slate-300 cursor-pointer">Device Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
