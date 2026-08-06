'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Globe, Plane, Banknote, Smartphone, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AiAdvisor() {
  const [destination, setDestination] = useState<string>('Japan');
  const [days, setDays] = useState<number>(10);
  const [budget, setBudget] = useState<number>(1500);
  const [phoneModel, setPhoneModel] = useState<string>('iPhone 15 Pro');
  const [question, setQuestion] = useState<string>('How much cash JPY vs IC Card/credit card should I bring, and what travel eSIM do I need?');

  const [loading, setLoading] = useState<boolean>(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presetTrips = [
    { dest: 'Japan', days: 10, budget: 1500, phone: 'iPhone 15 Pro', q: 'How much cash JPY vs IC Card should I bring, and eSIM advice?' },
    { dest: 'United Kingdom (London)', days: 7, budget: 1200, phone: 'Galaxy S24', q: 'Is cash still accepted in London or mostly contactless card?' },
    { dest: 'United Arab Emirates (Dubai)', days: 5, budget: 2000, phone: 'iPhone 16 Pro', q: 'AED cash breakdown for taxis & souks plus plug adapter type.' },
    { dest: 'European Union (France/Italy)', days: 12, budget: 2500, phone: 'Pixel 9 Pro', q: 'Best cash EUR amount for small cafes vs cards, plus eSIM details.' },
    { dest: 'Thailand', days: 14, budget: 1000, phone: 'iPhone 14', q: 'THB cash necessity for night markets & local SIM vs global eSIM.' },
  ];

  const handleSelectPreset = (p: typeof presetTrips[0]) => {
    setDestination(p.dest);
    setDays(p.days);
    setBudget(p.budget);
    setPhoneModel(p.phone);
    setQuestion(p.q);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAdvice(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          budgetUsd: budget,
          phoneModel,
          question,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate travel advice.');
      }

      setAdvice(data.advice);
    } catch (err: any) {
      setError(err.message || 'An error occurred while calling the AI advisor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-advisor" className="bg-[#0F1115] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini AI
            </span>
            <span className="text-xs text-slate-400 font-medium">• Travel Cash & Mobile Connectivity Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mt-1">
            AI Travel Currency & Mobile Assistant
          </h2>
        </div>

        <p className="text-xs text-slate-400 max-w-sm">
          Get tailor-made advice on foreign cash amounts, local tipping customs, power plug adapters, and travel eSIMs before your trip.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">Quick Destination Presets:</label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {presetTrips.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="px-3 py-1.5 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 whitespace-nowrap transition-colors"
            >
              ✈️ {p.dest} ({p.days} days)
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Destination Country</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Trip Length (Days)</label>
              <input
                type="number"
                min="1"
                required
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Total Budget (USD)</label>
              <input
                type="number"
                min="100"
                required
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Your Mobile Phone</label>
              <input
                type="text"
                value={phoneModel}
                onChange={(e) => setPhoneModel(e.target.value)}
                placeholder="e.g. iPhone 15 Pro"
                className="w-full bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Specific Travel Questions</label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-[#16191E] border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Consulting AI Travel Expert...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Generate Travel Cash & Telecom Breakdown</span>
              </>
            )}
          </button>
        </form>

        {/* Right Output Box */}
        <div className="lg:col-span-6 bg-[#16191E] border border-slate-800 rounded-2xl p-6 min-h-[320px] flex flex-col justify-between shadow-2xl relative">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  AI Travel Plan for {destination}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {days} Days • ${budget} USD Budget
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
                {error}
              </div>
            )}

            {!advice && !loading && !error && (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <Plane className="w-10 h-10 mx-auto text-slate-700" />
                <p className="text-xs">Fill in your travel details on the left and click &quot;Generate&quot; to receive an instant custom breakdown.</p>
              </div>
            )}

            {loading && (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 mx-auto text-teal-400 animate-spin" />
                <p className="text-xs text-slate-400 font-medium">Analyzing exchange rates, tipping customs, local SIM frequencies, and cash recommendations for {destination}...</p>
              </div>
            )}

            {advice && (
              <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-3 leading-relaxed max-h-[380px] overflow-y-auto pr-2">
                {advice.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {advice && (
            <div className="pt-4 border-t border-slate-800 text-[11px] text-teal-400 flex items-center justify-between mt-4">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All required notes & eSIMs available at our store counter!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
