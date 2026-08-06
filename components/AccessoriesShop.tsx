/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { AccessoryProduct } from '@/lib/types';
import { ACCESSORIES_DATA, getAccessoryPrice } from '@/lib/product-data';
import {
  Headphones,
  ShoppingBag,
  Star,
  CheckCircle2,
  Search,
  Filter,
  Check,
  Zap,
  Globe,
  Wifi,
  Eye,
  X
} from 'lucide-react';
import PriceDropNotifier from './PriceDropNotifier';
import Card3D from './Card3D';

interface AccessoriesShopProps {
  onAddToCart: (acc: AccessoryProduct) => void;
  searchQuery: string;
}

export default function AccessoriesShop({
  onAddToCart,
  searchQuery,
}: AccessoriesShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhoneModelFilter, setSelectedPhoneModelFilter] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activeDetailAcc, setActiveDetailAcc] = useState<AccessoryProduct | null>(null);
  const [selectedCapacities, setSelectedCapacities] = useState<Record<string, string>>({});

  const getCapSelection = (acc: AccessoryProduct) => {
    return selectedCapacities[acc.id] || acc.selectedCapacity || (acc.capacityOptions ? acc.capacityOptions[0] : '');
  };

  const handleSelectCapacity = (accId: string, cap: string) => {
    setSelectedCapacities((prev) => ({ ...prev, [accId]: cap }));
  };

  const activeSearch = searchQuery || localSearch;

  const categories = [
    'All',
    'Chargers & Cables',
    'Power Banks',
    'Travel eSIM & SIMs',
    'Adapters',
    'Audio & Wireless',
    'Cases & Glass',
  ];

  const phoneModelsList = ['All', 'iPhone 16', 'iPhone 15', 'iPhone 14', 'Galaxy S25', 'Pixel 9 Pro', 'Universal'];

  const filteredAccessories = ACCESSORIES_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesPhone =
      selectedPhoneModelFilter === 'All' ||
      item.compatibleModels.includes(selectedPhoneModelFilter) ||
      item.compatibleModels.includes('Universal');

    const matchesSearch =
      item.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(activeSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(activeSearch.toLowerCase());

    return matchesCat && matchesPhone && matchesSearch;
  });

  return (
    <div id="accessories" className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5" /> Mobile Accessories & Travel Essentials
            </span>
            <span className="text-xs text-slate-400 font-medium">• Chargers & Global eSIMs</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-light text-white mt-1">
            Phone Accessories & Travel eSIM Hub
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-500 text-black shadow-md'
                  : 'bg-[#16191E] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Phone Compatibility Matcher Bar */}
      <div className="p-4 rounded-2xl bg-[#16191E] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Zap className="w-5 h-5 text-teal-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Smart Compatibility Filter</div>
            <p className="text-[11px] text-slate-400">Select your phone model to auto-match guaranteed compatible items</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedPhoneModelFilter}
            onChange={(e) => setSelectedPhoneModelFilter(e.target.value)}
            className="w-full sm:w-56 bg-[#0F1115] border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-teal-400 focus:outline-none focus:border-teal-400 cursor-pointer"
          >
            {phoneModelsList.map((model) => (
              <option key={model} value={model}>
                {model === 'All' ? 'Filter By Device (Show All)' : `Matches: ${model}`}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search accessories..."
              className="w-full pl-9 pr-3 py-2 bg-[#0F1115] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>
      </div>

      {/* Grid of Accessories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAccessories.map((acc) => {
          const selectedCap = getCapSelection(acc);
          const currentPricing = getAccessoryPrice(acc, selectedCap);

          return (
            <Card3D
              key={acc.id}
              className="bg-[#16191E] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 group shadow-lg"
            >
              <div className="space-y-3">
                {/* Image & Badge */}
                <div 
                  className="relative bg-[#0F1115] rounded-xl p-4 flex items-center justify-center overflow-hidden h-44 border border-slate-800"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {acc.badge && (
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-teal-500 text-black text-[9px] font-extrabold uppercase tracking-wider">
                      {acc.badge}
                    </span>
                  )}

                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 z-10 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => setActiveDetailAcc(acc)}
                      className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all uppercase tracking-wider"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Title & Rating */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-teal-400 font-semibold">{acc.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-teal-400 text-teal-400" />
                      <span className="font-bold text-white">{acc.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {acc.name}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {acc.description}
                </p>

                {/* Capacity Options if available */}
                {acc.capacityOptions && acc.capacityOptions.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 font-medium">Select Variant / Tier:</span>
                    <div className="flex flex-wrap gap-1">
                      {acc.capacityOptions.map((cap) => {
                        const capPrice = getAccessoryPrice(acc, cap).price;
                        return (
                          <button
                            key={cap}
                            onClick={() => handleSelectCapacity(acc.id, cap)}
                            className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                              selectedCap === cap
                                ? 'bg-teal-500 text-black'
                                : 'bg-[#0F1115] text-slate-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            {cap} (${capPrice})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Key Feature bullet points */}
                <div className="space-y-1 pt-1">
                  {acc.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                      <Check className="w-3 h-3 text-teal-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Button */}
              <div className="pt-4 border-t border-slate-800 mt-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-lg font-bold text-teal-400">${currentPricing.price}</span>
                    {currentPricing.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${currentPricing.originalPrice}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">In Stock</span>
                </div>

                <button
                  onClick={() =>
                    onAddToCart({
                      ...acc,
                      price: currentPricing.price,
                      name: selectedCap ? `${acc.name} (${selectedCap})` : acc.name,
                    })
                  }
                  className="w-full py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add To Cart (${currentPricing.price})</span>
                </button>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Quick View Modal */}
      {activeDetailAcc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                {activeDetailAcc.category}
              </span>
              <button
                onClick={() => setActiveDetailAcc(null)}
                className="p-1 rounded-full bg-[#16191E] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 items-center bg-[#16191E] p-3 rounded-2xl border border-slate-800">
              <img
                src={activeDetailAcc.image}
                alt={activeDetailAcc.name}
                className="w-24 h-24 object-contain bg-[#0F1115] p-2 rounded-xl shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div>
                <h3 className="text-base font-bold text-white">{activeDetailAcc.name}</h3>
                <div className="flex items-baseline gap-2 mt-1 font-mono">
                  <span className="text-xl font-extrabold text-teal-400">${activeDetailAcc.price}</span>
                  {activeDetailAcc.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">${activeDetailAcc.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeDetailAcc.description}</p>

            {activeDetailAcc.features && (
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Key Features:</span>
                {activeDetailAcc.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            <PriceDropNotifier
              productName={activeDetailAcc.name}
              currentPrice={activeDetailAcc.price}
              productId={activeDetailAcc.id}
            />

            <button
              onClick={() => {
                onAddToCart(activeDetailAcc);
                setActiveDetailAcc(null);
              }}
              className="w-full py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Cart (${activeDetailAcc.price})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
