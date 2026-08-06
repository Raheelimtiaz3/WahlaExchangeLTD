'use client';

import React, { useState } from 'react';
import { Bell, Check, Mail, ArrowRight, X } from 'lucide-react';

interface PriceDropNotifierProps {
  productName: string;
  currentPrice: number;
  productId: string;
}

export default function PriceDropNotifier({
  productName,
  currentPrice,
  productId,
}: PriceDropNotifierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState(
    Math.floor(currentPrice * 0.9).toString()
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribedPrice, setSubscribedPrice] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribedEmail(email);
    setSubscribedPrice(targetPrice || Math.floor(currentPrice * 0.9).toString());
    setIsSubscribed(true);
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setSubscribedEmail('');
  };

  if (isSubscribed) {
    return (
      <div className="p-3.5 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-xs space-y-2 animate-in fade-in duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-300 font-bold">
            <Check className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Price Drop Tracker Active</span>
          </div>
          <button
            onClick={handleUnsubscribe}
            className="text-[10px] text-slate-400 hover:text-rose-400 underline"
          >
            Cancel Alert
          </button>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          We will send an instant notification to <strong className="text-white">{subscribedEmail}</strong> as soon as {productName} drops below <strong className="text-teal-300">${subscribedPrice} USD</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#16191E] border border-slate-800/80 rounded-2xl p-3.5 text-xs space-y-3">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-2 px-3 rounded-xl bg-[#0F1115] hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:border-teal-500/50 group"
        >
          <Bell className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Notify Me of Price Drops</span>
        </button>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-2.5">
          <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Bell className="w-3.5 h-3.5" /> Set Price Drop Alert
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-300 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#0F1115] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 whitespace-nowrap">Notify if price &lt;</span>
              <div className="relative flex-1">
                <span className="text-slate-400 absolute left-2.5 top-1.5 text-xs">$</span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full pl-6 pr-2 py-1 bg-[#0F1115] border border-slate-700 rounded-lg text-xs text-teal-300 font-mono font-bold focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md uppercase tracking-wider"
          >
            <span>Activate Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
