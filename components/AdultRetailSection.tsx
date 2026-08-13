'use client';

import React, { useState } from 'react';
import { VAPES_DATA } from '@/lib/product-data';
import { Product } from '@/lib/types';
import { AlertTriangle, ShieldAlert, ShoppingBag, CheckCircle2 } from 'lucide-react';

interface AdultRetailSectionProps {
  onAddToCart: (product: Product) => void;
}

export const AdultRetailSection: React.FC<AdultRetailSectionProps> = ({
  onAddToCart,
}) => {
  const [ageVerified, setAgeVerified] = useState(false);

  return (
    <section id="vapes-retail" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 text-[#172033] space-y-8">
      
      {/* Age Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-900">
              Age-Restricted Adult Retail Section (18+ Only)
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              In accordance with UK regulations, e-cigarette and vape products are strictly for adult smokers aged 18 and over. Challenge 25 photo ID verification is enforced upon collection at 22 Maxwell Road, Glasgow.
            </p>
          </div>
        </div>

        {!ageVerified && (
          <button
            onClick={() => setAgeVerified(true)}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Confirm I am 18 or Older
          </button>
        )}
      </div>

      {ageVerified ? (
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider inline-block border border-slate-200">
              WAHLA RETAIL • Adult Products Counter
            </span>
            <h2 className="text-2xl font-extrabold text-[#172033] mt-2">
              In-Store Vape Accessories & Pod Systems
            </h2>
            <p className="text-xs text-slate-600">
              Pick up at 22 Maxwell Road, Pollokshields, Glasgow. Valid government photo ID required at point of collection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VAPES_DATA.map((product) => (
              <div
                key={product.id}
                className="p-5 rounded-2xl bg-[#F6F8FA] border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-full h-40 bg-white rounded-xl overflow-hidden border border-slate-200 p-4 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-2 left-2 bg-amber-800 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      18+ Adult Retail
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#172033]">{product.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{product.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900">£{product.price.toFixed(2)}</span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Reserve in Store</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 text-center space-y-3 bg-[#F6F8FA] rounded-2xl border border-slate-200">
          <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="text-base font-bold text-[#172033]">
            Age Verification Required to View Adult Products
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Please confirm that you are 18 years of age or older to view in-store adult retail products.
          </p>
          <button
            onClick={() => setAgeVerified(true)}
            className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            I Confirm I Am 18+
          </button>
        </div>
      )}

    </section>
  );
};
