'use client';

import React, { useState } from 'react';
import { Product, CartItem } from '@/lib/types';
import { ShoppingBag, Star, Check } from 'lucide-react';

interface PhonesCatalogProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onSelectProduct?: (product: Product) => void;
}

export const PhonesCatalog: React.FC<PhonesCatalogProps> = ({ products, onAddToCart, onSelectProduct }) => {
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
          <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Certified Unlocked Flagships
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            New & Certified Unlocked Smartphones
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Includes 1-Year Store Guarantee • Global Frequency Support for International Travel
          </p>
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'Apple', 'Samsung', 'Google'].map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all capitalize shrink-0 cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
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
            className="bg-white border border-slate-200 hover:border-blue-500/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-xl group cursor-pointer"
            onClick={() => onSelectProduct?.(phone)}
          >
            <div>
              {/* Badge & Image */}
              <div className="relative aspect-4/3 rounded-2xl bg-slate-50 overflow-hidden mb-5 border border-slate-100 flex items-center justify-center p-4">
                {phone.badge && (
                  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-blue-600 text-[10px] font-black text-white shadow-xs">
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

                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black shadow-lg">
                    View Specs & Details
                  </span>
                </div>
              </div>

              {/* Title & Brand */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold">
                <span className="font-extrabold uppercase tracking-wider text-blue-600">{phone.brand}</span>
                <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{phone.rating}</span>
                  <span className="text-slate-400">({phone.reviewsCount})</span>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                {phone.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed font-medium">
                {phone.description}
              </p>

              {/* Specs */}
              {phone.specs && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] space-y-1 text-slate-600 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Display:</span>
                    <span className="font-bold text-slate-800">{phone.specs.Screen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Chipset:</span>
                    <span className="font-bold text-slate-800">{phone.specs.Processor}</span>
                  </div>
                </div>
              )}

              {/* Memory Storage Price Breakdown */}
              {phone.storagePrices && phone.storagePrices.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1.5">
                    Memory Options & Pricing:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {phone.storagePrices.map((sp) => (
                      <span
                        key={sp.storage}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-extrabold"
                      >
                        {sp.storage}: <span className="text-blue-600">£{sp.price.toFixed(0)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Glasgow Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">£{phone.price.toFixed(2)}</span>
                  {phone.originalPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">£{phone.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(phone);
                }}
                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                  addedId === phone.id
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
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

export default PhonesCatalog;
