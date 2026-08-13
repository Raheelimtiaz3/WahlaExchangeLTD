'use client';

import React from 'react';
import { ActivePageTab } from '@/lib/types';
import { REGULATORY_DETAILS, GLASGOW_BRANCH } from '@/lib/remittance-data';
import { ShieldCheck, ExternalLink, MapPin, PhoneCall, Mail } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: ActivePageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="bg-[#0B1F33] text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Brand & Agent Summary */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg">
                W
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  WAHLA EXCHANGE LTD
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  Money Remittance & Currency Exchange
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Providing professional UK international money remittance under a PSD Agent model and foreign currency exchange at our Glasgow counter.
            </p>

            <div className="space-y-1 text-[11px] text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{GLASGOW_BRANCH.address}, {GLASGOW_BRANCH.city}, {GLASGOW_BRANCH.postcode}</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{GLASGOW_BRANCH.phone}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Money Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Money Services
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onTabChange('remittance')} className="hover:text-white cursor-pointer">
                  Money Remittance
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('remittance')} className="hover:text-white cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('currency-exchange')} className="hover:text-white cursor-pointer">
                  Exchange Rates
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('remittance')} className="hover:text-white cursor-pointer">
                  Transfer Corridors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Currency Exchange */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Currency Exchange
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onTabChange('currency-exchange')} className="hover:text-white cursor-pointer">
                  Bureau De Change
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('currency-exchange')} className="hover:text-white cursor-pointer">
                  Reserve Foreign Cash
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('contact')} className="hover:text-white cursor-pointer">
                  Glasgow Branch Counter
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('mobile-tech')} className="hover:text-white cursor-pointer">
                  Mobile & Tech (WAHLA TECH)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulation & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Regulation & Compliance
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>
                <button onClick={() => onTabChange('regulatory-info')} className="hover:text-white cursor-pointer">
                  Regulatory Information
                </button>
              </li>
              <li>
                <button onClick={() => onTabChange('complaints')} className="hover:text-white cursor-pointer">
                  Complaints Policy
                </button>
              </li>
              <li>
                <a
                  href={REGULATORY_DETAILS.fcaRegisterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>FCA Register Search</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <button onClick={() => onTabChange('about-us')} className="hover:text-white cursor-pointer">
                  About Us
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclosure Banner Box in Footer */}
        <div className="p-5 rounded-2xl bg-[#071321] border border-slate-800 text-xs space-y-3 leading-relaxed">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Regulatory Disclosures — Wahla Exchange Ltd</span>
          </div>

          <p className="text-slate-300">
            <strong>Money Remittance:</strong> {REGULATORY_DETAILS.remittanceDisclosure}
          </p>

          <p className="text-slate-300">
            <strong>Currency Exchange:</strong> {REGULATORY_DETAILS.bureauDisclosure}
          </p>

          <p className="text-slate-400 text-[11px]">
            Wahla Exchange Ltd (FCA FRN: {REGULATORY_DETAILS.fcaAgentFrn}). Principal Firm: Noble Travel and Money Exchange Ltd (FCA FRN: {REGULATORY_DETAILS.principalFrn}). Registered office and Glasgow branch: 22 Maxwell Road, Pollokshields, Glasgow, G41 1QE, Scotland, UK.
          </p>
        </div>

        {/* Bottom Legal Copyright Strip */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Wahla Exchange Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onTabChange('regulatory-info')} className="hover:text-white cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => onTabChange('regulatory-info')} className="hover:text-white cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onTabChange('complaints')} className="hover:text-white cursor-pointer">
              Complaints
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
