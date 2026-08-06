'use client';

import React, { useState } from 'react';
import { Product, CartItem } from '@/lib/types';
import { ShoppingBag, Star, Check, Smartphone, ShieldCheck } from 'lucide-react';

interface PhonesCatalogProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
}

export const PhonesCatalog: React.FC<PhonesCatalogProps> = ({ products, onAddToCart }) => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const phoneProducts = products.filter((p) => p.category === 'smartphones');
  const filtered = selectedBrand === 'all'
    ? phoneProducts
    : phoneProducts.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  const handleAdd = (product: Product) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      subtitle: `${product.brand} • Certified Unlocked`,
      price: product.price,
      type: 'phone',
      image: product.image,
      quantity: 1,
      specs: {
        storage: product.storageOptions?.[0] || '256GB',
        color: product.colorVariants?.[0]?.name || 'Default',
      },
    });

    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div id="smartphones" className="py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Certified Unlocked Flagships
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            New & Unlocked Smartphones
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Includes 1-Year Store Guarantee • Global Frequency Support for International Travel
          </p>
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'Apple', 'Samsung', 'Google'].map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize shrink-0 ${
                selectedBrand === brand
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-[#14171F] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((phone) => (
          <div
            key={phone.id}
            className="bg-[#14171F] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
          >
            <div>
              {/* Badge & Image */}
              <div className="relative aspect-4/3 rounded-xl bg-[#0B0D12] overflow-hidden mb-4 border border-slate-800 flex items-center justify-center p-4">
                {phone.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-teal-950/90 border border-teal-800/80 text-[10px] font-bold text-teal-300">
                    {phone.badge}
                  </span>
                )}

                <img
                  src={phone.image}
                  alt={phone.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Title & Brand */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider text-teal-400">{phone.brand}</span>
                <div className="flex items-center gap-1 text-amber-400 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{phone.rating}</span>
                  <span className="text-slate-500">({phone.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-teal-300 transition-colors">
                {phone.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                {phone.description}
              </p>

              {/* Specs */}
              {phone.specs && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Display:</span>
                    <span className="font-semibold">{phone.specs.Screen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chipset:</span>
                    <span className="font-semibold">{phone.specs.Processor}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Glasgow Counter Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white">£{phone.price.toFixed(2)}</span>
                  {phone.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">£{phone.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAdd(phone)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
                  addedId === phone.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                }`}
              >
                {addedId === phone.id ? (
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
