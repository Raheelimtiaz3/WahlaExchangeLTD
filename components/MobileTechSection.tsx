'use client';

import React, { useState } from 'react';
import { PHONES_DATA, ACCESSORIES_DATA } from '@/lib/product-data';
import { Product } from '@/lib/types';
import { Smartphone, ShoppingBag, Star, CheckCircle2, Zap } from 'lucide-react';

interface MobileTechSectionProps {
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const MobileTechSection: React.FC<MobileTechSectionProps> = ({
  onAddToCart,
  onOpenProductDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'phones' | 'accessories'>('all');

  const displayedProducts =
    activeCategory === 'phones'
      ? PHONES_DATA
      : activeCategory === 'accessories'
      ? ACCESSORIES_DATA
      : [...PHONES_DATA.slice(0, 3), ...ACCESSORIES_DATA.slice(0, 3)];

  return (
    <section id="mobile-tech" className="py-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-[#172033] space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider inline-block mb-2 border border-slate-200">
            WAHLA TECH • Retail Hardware
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172033]">
            Smartphones & Travel Tech
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Certified unlocked smartphones, travel powerbanks, GaN fast chargers, and audio accessories available in store at 22 Maxwell Road, Glasgow.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'all' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Featured Tech
          </button>
          <button
            onClick={() => setActiveCategory('phones')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'phones' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phones
          </button>
          <button
            onClick={() => setActiveCategory('accessories')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeCategory === 'accessories' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chargers & Gear
          </button>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="p-5 rounded-2xl bg-[#F6F8FA] border border-slate-200 hover:border-blue-300 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              
              {/* Product Image */}
              <div
                onClick={() => onOpenProductDetail(product)}
                className="w-full h-48 rounded-xl overflow-hidden bg-white border border-slate-200/80 relative cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-black rounded-md shadow-xs uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Brand */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {product.brand}
                </span>
                <h3
                  onClick={() => onOpenProductDetail(product)}
                  className="text-base font-extrabold text-[#172033] hover:text-blue-600 cursor-pointer transition-colors line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>

            </div>

            {/* Price & Add to Cart */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-[#172033]">
                    £{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      £{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> In Stock at Glasgow Store
                </span>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
