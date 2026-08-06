'use client';

import React, { useState } from 'react';
import { TRADEIN_MODELS } from '@/lib/tradein-data';
import { Smartphone, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PhoneTradeInCalculator: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedModel, setSelectedModel] = useState('iPhone 15 Pro Max');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [condition, setCondition] = useState<'Good' | 'Fair' | 'Flawless'>('Good');

  const filteredModels = TRADEIN_MODELS.filter((m) => m.brand === selectedBrand);
  const currentModelObj = filteredModels.find((m) => m.model === selectedModel) || filteredModels[0] || TRADEIN_MODELS[0];

  const storageOptions = Object.keys(currentModelObj.storageValues);
  const baseValue = currentModelObj.storageValues[selectedStorage] || currentModelObj.storageValues[storageOptions[0]] || 400;

  let multiplier = 1.0;
  if (condition === 'Flawless') multiplier = 1.1;
  if (condition === 'Fair') multiplier = 0.8;

  const estimatedValue = Math.round(baseValue * multiplier);

  return (
    <div id="trade-in" className="py-8">
      <div className="bg-[#14171F] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-1 rounded-md border border-teal-800/60">
              Instant Cash or Upgrade Credit
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Phone Trade-In Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Trade in your current smartphone at our Glasgow store counter (22 Maxwell Road) for instant cash payout or store credit towards a new iPhone, Samsung Galaxy, or foreign currency exchange.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Instant inspection at Glasgow counter in under 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Cash payout or direct store credit towards foreign exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Free secure data wipe certification provided</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#0B0D12] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            {/* Brand Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Select Brand</label>
              <div className="grid grid-cols-3 gap-2">
                {['Apple', 'Samsung', 'Google'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setSelectedBrand(b);
                      const models = TRADEIN_MODELS.filter((m) => m.brand === b);
                      if (models[0]) {
                        setSelectedModel(models[0].model);
                        setSelectedStorage(Object.keys(models[0].storageValues)[0]);
                      }
                    }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedBrand === b
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-[#14171F] text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Select */}
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Select Model</label>
              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  const m = TRADEIN_MODELS.find((item) => item.model === e.target.value);
                  if (m) setSelectedStorage(Object.keys(m.storageValues)[0]);
                }}
                className="w-full py-2.5 px-3 bg-[#14171F] border border-slate-700/80 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-teal-400"
              >
                {filteredModels.map((m) => (
                  <option key={m.model} value={m.model}>
                    {m.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Storage & Condition */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Storage</label>
                <select
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#14171F] border border-slate-700/80 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-teal-400"
                >
                  {storageOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full py-2.5 px-3 bg-[#14171F] border border-slate-700/80 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="Flawless">Flawless (Like New)</option>
                  <option value="Good">Good (Minor Wear)</option>
                  <option value="Fair">Fair (Noticeable Scratches)</option>
                </select>
              </div>
            </div>

            {/* Value Result */}
            <div className="p-4 rounded-xl bg-teal-950/50 border border-teal-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">
                  Estimated Counter Value
                </span>
                <span className="text-2xl font-black text-white">£{estimatedValue} GBP</span>
              </div>

              <a
                href="https://wa.me/441412660379"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shadow-md"
              >
                <span>WhatsApp Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PhoneTradeInCalculator;

