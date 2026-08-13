'use client';

import React, { useState } from 'react';
import { REGULATORY_DETAILS, GLASGOW_BRANCH } from '@/lib/remittance-data';
import { FileText, Send, CheckCircle2, PhoneCall, Mail, MapPin, Building2 } from 'lucide-react';

export const ComplaintsView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="complaints" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider inline-block border border-slate-200">
          Customer Service & Complaints Policy
        </span>
        <h1 className="text-3xl font-extrabold text-[#172033]">
          Complaints Procedure
        </h1>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
          At Wahla Exchange Ltd, we aim to deliver fair, transparent, and prompt financial services. If you are dissatisfied with any aspect of our service, we encourage you to inform us immediately so we can investigate and resolve your concerns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Complaint Process Overview */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-[#172033] flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>How to Submit a Complaint</span>
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed">
              You can lodge a complaint through any of the following channels:
            </p>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Email Compliance Desk</strong>
                  <a href={`mailto:${GLASGOW_BRANCH.email}`} className="text-blue-600 hover:underline">
                    {GLASGOW_BRANCH.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <PhoneCall className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Branch Phone Support</strong>
                  <span>{GLASGOW_BRANCH.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">In Person / Written Post</strong>
                  <span>Compliance Officer, Wahla Exchange Ltd, 22 Maxwell Road, Glasgow, G41 1QE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600">
            <h3 className="text-base font-bold text-[#172033]">
              Money Remittance Complaint Handling & Principal Escalation
            </h3>
            <p className="leading-relaxed">
              For complaints relating to international money remittance services, Wahla Exchange Ltd manages your complaint as a registered PSD Agent (FCA FRN: {REGULATORY_DETAILS.fcaAgentFrn}) in liaison with our principal firm, <strong>{REGULATORY_DETAILS.principalName}</strong> (FCA FRN: {REGULATORY_DETAILS.principalFrn}).
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-700 space-y-1">
              <strong className="block text-slate-900">Expected Resolution Timelines:</strong>
              <p>• Acknowledgment: Within 24-48 business hours [BUSINESS TO CONFIRM exact SLA].</p>
              <p>• Final Response: For payment services, within 15 business days (or up to 35 business days in exceptional circumstances) [BUSINESS TO CONFIRM].</p>
            </div>
          </div>

        </div>

        {/* Right Column: Online Complaint Form */}
        <div className="lg:col-span-6 bg-[#F6F8FA] p-6 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-[#172033]">
            Submit a Formal Service Inquiry or Complaint
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-extrabold text-emerald-950">
                Complaint Received
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you for contacting our compliance desk. Your matter has been logged and assigned to our manager. A written acknowledgment will be issued shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transaction Ref (If Applicable)</label>
                  <input
                    type="text"
                    value={refNo}
                    onChange={(e) => setRefNo(e.target.value)}
                    placeholder="e.g. WM-123456"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Details of Complaint or Inquiry</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe the nature of your concern, dates, and desired resolution..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-all"
              >
                Submit Formal Complaint
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
