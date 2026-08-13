'use client';

import React from 'react';
import { Banknote, Smartphone, ShieldCheck, MapPin, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center">
                W
              </div>
              <span className="font-black text-lg text-white">
                WAHLA <span className="text-emerald-400">EXCHANGE</span> LTD
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm font-medium">
              Your premier licensed currency exchange counter & authorized unlocked smartphone trader. Zero commission fees on foreign cash notes, instant phone trade-in quotes, and global travel eSIMs.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300 font-medium">
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
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Currency Exchange
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#currency-exchange" className="hover:text-emerald-400 transition-colors">Instant Currency Calculator</a></li>
              <li><a href="#currency-exchange" className="hover:text-emerald-400 transition-colors">Today&apos;s Exchange Rates</a></li>
              <li><a href="#currency-exchange" className="hover:text-emerald-400 transition-colors">Reserve Currency Voucher</a></li>
              <li><a href="#ai-advisor" className="hover:text-emerald-400 transition-colors">AI Travel Cash Advice</a></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Smartphones & Tech
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#smartphones" className="hover:text-emerald-400 transition-colors">Unlocked iPhone & Galaxy</a></li>
              <li><a href="#trade-in" className="hover:text-emerald-400 transition-colors">Phone Trade-In Calculator</a></li>
              <li><a href="#accessories" className="hover:text-emerald-400 transition-colors">65W Travel Fast Chargers</a></li>
              <li><a href="#accessories" className="hover:text-emerald-400 transition-colors">Global Travel eSIM Passes</a></li>
            </ul>
          </div>

          {/* Counter Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs">
              Glasgow Branch
            </h4>
            <div className="space-y-2 text-slate-400 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>22 Maxwell Road, Glasgow, G41 1QE, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hotline: +44 141 266 0379</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Glasgow Counter: Mon-Sat 8am - 9pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Wahla Exchange LTD. All rights reserved.</p>

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
