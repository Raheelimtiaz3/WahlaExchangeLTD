'use client';

import React, { useState } from 'react';
import { Product, CartItem } from '@/lib/types';
import { ShoppingBag, Star, Check, Zap, BatteryCharging, Headphones } from 'lucide-react';

interface AccessoriesShopProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export const AccessoriesShop: React.FC<AccessoriesShopProps> = ({ products, onAddToCart }) => {
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
        <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Travel Mobile Accessories
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Travel Power, Audio & eSIM Accessories
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          GaN Fast Chargers, MagSafe Wireless Battery Packs & International Travel Audio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((acc) => (
          <div
            key={acc.id}
            className="bg-[#14171F] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
          >
            <div>
              <div className="relative aspect-4/3 rounded-xl bg-[#0B0D12] overflow-hidden mb-4 border border-slate-800 flex items-center justify-center p-4">
                {acc.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-teal-950/90 border border-teal-800/80 text-[10px] font-bold text-teal-300">
                    {acc.badge}
                  </span>
                )}

                <img
                  src={acc.image}
                  alt={acc.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (acc.category === 'powerbanks') {
                      img.src = '/images/magsafe_powerbank.jpg';
                    } else if (acc.category === 'audio') {
                      img.src = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80';
                    } else {
                      img.src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider text-teal-400">{acc.brand}</span>
                <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{acc.rating}</span>
                  <span className="text-slate-500">({acc.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                {acc.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                {acc.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Store Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white">£{acc.price.toFixed(2)}</span>
                  {acc.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">£{acc.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAdd(acc)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                  addedId === acc.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
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

