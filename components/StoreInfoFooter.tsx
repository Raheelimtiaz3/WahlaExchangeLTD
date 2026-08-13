'use client';

import React from 'react';
import { MapPin, PhoneCall, Clock, ShieldCheck, MessageCircle } from 'lucide-react';

export const StoreInfoFooter: React.FC = () => {
  return (
    <footer id="store-location" className="bg-slate-950 border-t border-slate-800 text-slate-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Store Branding & Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-black text-lg">
                W
              </div>
              <span className="font-black text-lg text-white">
                WAHLA <span className="text-cyan-400">EXCHANGE</span> LTD
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Zero-Commission Foreign Currency Exchange & Premium Unlocked Smartphone Center in Glasgow, United Kingdom.
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-300 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>22 Maxwell Road, Glasgow, G41 1QE, Scotland, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+441412660379" className="hover:text-cyan-400 font-bold">+44 141 266 0379</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="https://wa.me/441412660379" target="_blank" rel="noreferrer" className="hover:text-cyan-400 font-bold text-cyan-400">
                  WhatsApp Support Active
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Counter Hours</span>
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Monday - Friday</span>
                <span className="font-bold text-white">8:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Saturday</span>
                <span className="font-bold text-white">8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sunday</span>
                <span className="font-bold text-cyan-400">10:00 AM - 6:00 PM</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium">
              *Instant Rate Lock reserved online is guaranteed for 48 hours for counter pickup.
            </p>
          </div>

          {/* Col 3: Services Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="text-xs space-y-2 text-slate-400 font-medium">
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• 0% Commission Foreign Exchange</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Certified Unlocked iPhone & Samsung Sales</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Pre-owned Phone Cash Trade-In</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• 65W GaN Travel Fast Chargers & Power Banks</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Global Travel eSIM Passes</li>
            </ul>
          </div>

          {/* Col 4: Trust & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Glasgow Counter Trust</span>
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Wahla Exchange LTD is a registered company in Scotland. All currency rates updated live. Zero hidden fees or commission charges.
            </p>

            <div className="p-3.5 rounded-xl bg-blue-950/80 border border-blue-900/80 text-cyan-200 text-xs font-medium">
              <strong className="block font-bold">100% Rate Lock Guarantee</strong>
              <span>Lock rate online, pay at counter upon pickup.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
          <p>© {new Date().getFullYear()} Wahla Exchange LTD. All rights reserved. 22 Maxwell Road, Glasgow, G41 1QE.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">FCA Compliance Info</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default StoreInfoFooter;
