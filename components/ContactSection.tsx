'use client';

import React, { useState } from 'react';
import { GLASGOW_BRANCH } from '@/lib/remittance-data';
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-10">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-6 space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider inline-block border border-slate-200">
          Glasgow Store & Support
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
          Contact Wahla Exchange
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          Visit our Glasgow store counter or get in touch with our team for money transfer quotes, foreign currency reservation, or technical inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Branch Information */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0B1F33] text-white space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Building2 className="w-5 h-5" />
              <span>Glasgow Main Branch</span>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Store Address</strong>
                  <span>{GLASGOW_BRANCH.address}, {GLASGOW_BRANCH.city}, {GLASGOW_BRANCH.postcode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Telephone / Desk</strong>
                  <span>{GLASGOW_BRANCH.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Email Address</strong>
                  <span>{GLASGOW_BRANCH.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white">Opening Hours</strong>
                  <p>Monday - Friday: {GLASGOW_BRANCH.hours.weekday}</p>
                  <p>Saturday: {GLASGOW_BRANCH.hours.saturday}</p>
                  <p>Sunday: {GLASGOW_BRANCH.hours.sunday}</p>
                </div>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(GLASGOW_BRANCH.address + ' ' + GLASGOW_BRANCH.postcode)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open Directions in Google Maps</span>
            </a>
          </div>

        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7 bg-[#F6F8FA] p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-[#172033]">Send Us a Direct Inquiry</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-950">Inquiry Sent</h4>
              <p className="text-xs text-emerald-800">
                Thank you for contacting Wahla Exchange. Our Glasgow branch desk will reply shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7123 456789"
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">How Can We Help?</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about exchange rates, money transfer corridors, or store products..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#155EEF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>

      </div>

    </section>
  );
};
