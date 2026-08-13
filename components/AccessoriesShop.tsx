'use client';

import React, { useState } from 'react';
import { Product, CartItem } from '@/lib/types';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface AccessoriesShopProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onSelectProduct?: (product: Product) => void;
}

export const AccessoriesShop: React.FC<AccessoriesShopProps> = ({ products, onAddToCart, onSelectProduct }) => {
  const [addedId, setAddedId] = useState<string | null>(null);
  const accessories = products.filter((p) => p.category !== 'smartphones');

  const handleAdd = (item: Product) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      subtitle: `${item.brand} • Travel Essential`,
      price: item.price,
      type: 'accessory',
      image: item.image,
      quantity: 1,
    });

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div id="accessories" className="py-8">
      <div className="mb-8">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          Travel Mobile Accessories
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Travel Power, Audio & Fast Chargers
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          GaN Fast Chargers, MagSafe Wireless Battery Packs & International Travel Audio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((acc) => (
          <div
            key={acc.id}
            className="bg-white border border-slate-200 hover:border-emerald-500/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group cursor-pointer"
            onClick={() => onSelectProduct?.(acc)}
          >
            <div>
              <div className="relative aspect-4/3 rounded-2xl bg-slate-50 overflow-hidden mb-5 border border-slate-100 flex items-center justify-center p-4">
                {acc.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-emerald-600 text-[10px] font-black text-white shadow-xs">
                    {acc.badge}
                  </span>
                )}

                <img
                  src={acc.image}
                  alt={acc.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.dataset.failed) {
                      img.dataset.failed = 'true';
                      if (acc.category === 'powerbanks') {
                        img.src = 'https://images.unsplash.com/photo-1622445268465-8438a05058aa?auto=format&fit=crop&w=800&q=80';
                      } else if (acc.category === 'audio') {
                        img.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80';
                      } else {
                        img.src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
                      }
                    }
                  }}
                />

                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black shadow-lg">
                    View Specs & Details
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span className="font-extrabold uppercase tracking-wider text-emerald-700">{acc.brand}</span>
                <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{acc.rating}</span>
                  <span className="text-slate-400">({acc.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {acc.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed font-medium">
                {acc.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Glasgow Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">£{acc.price.toFixed(2)}</span>
                  {acc.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">£{acc.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(acc);
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  addedId === acc.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {addedId === acc.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesShop;
