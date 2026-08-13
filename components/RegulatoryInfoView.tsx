'use client';

import React from 'react';
import { REGULATORY_DETAILS } from '@/lib/remittance-data';
import { ShieldCheck, Building2, ExternalLink, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const RegulatoryInfoView: React.FC = () => {
  return (
    <div id="regulatory-info" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-10">
      
      {/* Page Title */}
      <div className="border-b border-slate-100 pb-6 space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider inline-block">
          Regulatory Disclosure & Compliance
        </span>
        <h1 className="text-3xl font-extrabold text-[#172033]">
          Regulatory Information & Legal Status
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
          Wahla Exchange Ltd operates with full commitment to UK financial regulations, regulatory transparency, and anti-money laundering compliance across all money service activities.
        </p>
      </div>

      {/* Section 1: Money Remittance Regulatory Framework */}
      <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <h2 className="text-xl font-bold text-[#172033]">
              1. Money Remittance Service Regulatory Status
            </h2>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-900 font-bold text-xs rounded-lg">
            PSD Agent Model
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p className="text-sm font-semibold text-slate-900">
            {REGULATORY_DETAILS.remittanceDisclosure}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Agent Entity</span>
              <p className="font-extrabold text-sm text-[#172033]">Wahla Exchange Ltd</p>
              <p className="text-slate-600">FCA FRN: <strong>{REGULATORY_DETAILS.fcaAgentFrn}</strong></p>
              <p className="text-slate-500 text-[11px]">Registered Payment Services Agent in the UK</p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Principal Firm</span>
              <p className="font-extrabold text-sm text-[#172033]">{REGULATORY_DETAILS.principalName}</p>
              <p className="text-slate-600">Principal FCA FRN: <strong>{REGULATORY_DETAILS.principalFrn}</strong></p>
              <p className="text-slate-500 text-[11px]">FCA-Authorised Payment Institution</p>
            </div>
          </div>

          <p className="text-slate-600 pt-1">
            As a registered Payment Services Directive (PSD) agent, Wahla Exchange Ltd provides money remittance services under the regulatory oversight and authorization of our principal firm, Noble Travel and Money Exchange Ltd.
          </p>

          <div className="pt-2">
            <a
              href={REGULATORY_DETAILS.fcaRegisterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#155EEF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <span>Verify Wahla Exchange Ltd on FCA Financial Services Register</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Section 2: Currency Exchange (Bureau de Change) Position */}
      <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <h2 className="text-xl font-bold text-[#172033]">
              2. Currency Exchange (Bureau De Change) Regulatory Position
            </h2>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-lg">
            HMRC MLR Registered
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p className="text-sm font-semibold text-slate-900">
            {REGULATORY_DETAILS.bureauDisclosure}
          </p>

          <p>
            Foreign currency counter buying and selling (bureau de change) operations are conducted in full compliance with UK Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations.
          </p>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium flex items-start gap-2 text-[11px]">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Note on Bureau Governance:</strong> Sia Trade Ltd is registered with HMRC for Money Laundering Regulations (MLR) supervision for bureau de change activities. Currency exchange services are not described as FCA-authorised as bureau de change is supervised by HMRC.
            </span>
          </div>
        </div>
      </div>

      {/* Section 3: AML & KYC Compliance Standards */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
        <h2 className="text-xl font-bold text-[#172033] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>3. Anti-Money Laundering (AML) & Customer Identification</span>
        </h2>
        <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
          <p>
            Wahla Exchange Ltd strictly enforces Anti-Money Laundering (AML) policies and Know Your Customer (KYC) requirements across all counter and digital transactions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Valid Government Photo ID (Passport, UK Photo Driving Licence, or EU National Identity Card) required.</li>
            <li>Proof of Address (Utility bill, bank statement issued within 3 months) required for threshold transactions or enhanced due diligence.</li>
            <li>Source of Funds documentation where required by compliance policy or statutory triggers.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
