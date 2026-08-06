/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { PhoneProduct } from '@/lib/types';
import { PHONES_DATA, getPhonePrice } from '@/lib/product-data';
import {
  Smartphone,
  CheckCircle2,
  Star,
  ShoppingBag,
  ShieldCheck,
  Search,
  Filter,
  Info,
  X,
  Zap,
  Eye
} from 'lucide-react';
import PriceDropNotifier from './PriceDropNotifier';
import Card3D from './Card3D';

interface PhonesCatalogProps {
  onAddToCart: (phone: PhoneProduct, selectedStorage: string, selectedColor: string) => void;
  searchQuery: string;
}

export default function PhonesCatalog({
  onAddToCart,
  searchQuery,
}: PhonesCatalogProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');
  
  const [activeSpecsPhone, setActiveSpecsPhone] = useState<PhoneProduct | null>(null);

  // State for tracking storage & color per phone
  const [phoneSelections, setPhoneSelections] = useState<
    Record<string, { storage: string; color: string }>
  >({});

  const activeSearch = searchQuery || localSearch;

  const brands = ['All', 'Apple', 'Samsung', 'Google', 'Xiaomi'];
  const conditions = ['All', 'Brand New', 'Certified Refurbished', 'Unlocked Pre-owned'];

  const filteredPhones = PHONES_DATA.filter((p) => {
    const matchesBrand = selectedBrand === 'All' || p.brand === selectedBrand;
    const matchesCondition = selectedCondition === 'All' || p.condition === selectedCondition;
    const matchesSearch =
      p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.model.toLowerCase().includes(activeSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(activeSearch.toLowerCase());

    return matchesBrand && matchesCondition && matchesSearch;
  });

  const getPhoneSelection = (phone: PhoneProduct) => {
    return (
      phoneSelections[phone.id] || {
        storage: phone.selectedStorage || phone.storageOptions[0],
        color: phone.colorVariants[0]?.name || 'Standard',
      }
    );
  };

  const handleUpdateSelection = (phoneId: string, key: 'storage' | 'color', val: string) => {
    setPhoneSelections((prev) => ({
      ...prev,
      [phoneId]: {
        ...(prev[phoneId] || {
          storage: PHONES_DATA.find((p) => p.id === phoneId)?.storageOptions[0] || '128GB',
          color: PHONES_DATA.find((p) => p.id === phoneId)?.colorVariants[0]?.name || 'Standard',
        }),
        [key]: val,
      },
    }));
  };

  return (
    <div id="phones" className="bg-[#0F1115] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-xl">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Certified Unlocked Store
            </span>
            <span className="text-xs text-slate-400 font-medium">• Global Network Support</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-light text-white mt-1">
            Unlocked Smartphones & Hardware
          </h2>
        </div>

        {/* Brand Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBrand === b
                  ? 'bg-teal-500 text-black shadow-md'
                  : 'bg-[#16191E] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Search & Condition Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search phone model (e.g. S25 Ultra, iPhone 16)..."
            className="w-full pl-9 pr-3 py-2 bg-[#16191E] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium">Condition:</span>
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="bg-[#16191E] border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-teal-400 cursor-pointer"
          >
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Phones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhones.map((phone) => {
          const sel = getPhoneSelection(phone);
          const activeColorObj =
            phone.colorVariants.find((cv) => cv.name === sel.color) || phone.colorVariants[0];
          const currentPricing = getPhonePrice(phone, sel.storage);

          return (
            <Card3D
              key={phone.id}
              className="bg-[#16191E] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 group shadow-lg"
            >
              <div className="space-y-4">
                {/* Badges & Image */}
                <div 
                  className="relative bg-[#0F1115] rounded-xl p-4 flex items-center justify-center overflow-hidden h-48 border border-slate-800"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {phone.isBestseller && (
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-teal-500 text-black text-[9px] font-extrabold uppercase tracking-wider">
                      Bestseller
                    </span>
                  )}

                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#16191E] border border-slate-800 text-slate-300 text-[10px] font-bold">
                    {phone.condition}
                  </span>

                  <img
                    src={activeColorObj.image || phone.image}
                    alt={phone.name}
                    className="h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Quick View Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 z-10 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      onClick={() => setActiveSpecsPhone(phone)}
                      className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all uppercase tracking-wider"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Info Header */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-teal-400">{phone.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-teal-400 text-teal-400" />
                      <span className="font-bold text-white">{phone.rating}</span>
                      <span>({phone.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-white mt-1 leading-snug">
                    {phone.name}
                  </h3>

                  {/* Dynamic Price based on Selected Storage Tier */}
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-xl font-extrabold text-teal-400 font-mono">
                      ${currentPricing.price}
                    </span>
                    {currentPricing.originalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ${currentPricing.originalPrice}
                      </span>
                    )}
                    <span className="text-[10px] text-teal-400 font-bold bg-teal-950/60 border border-teal-500/30 px-1.5 py-0.5 rounded ml-auto">
                      Unlocked 5G
                    </span>
                  </div>
                </div>

                {/* Storage Selector with Separate Storage Tier Prices */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Storage Capacity:</span>
                    <span className="text-[11px] text-teal-400 font-bold font-mono">{sel.storage} (${currentPricing.price})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {phone.storageOptions.map((st) => {
                      const stPrice = getPhonePrice(phone, st).price;
                      return (
                        <button
                          key={st}
                          onClick={() => handleUpdateSelection(phone.id, 'storage', st)}
                          className={`px-2 py-1.5 rounded-lg text-xs font-mono font-bold transition-all text-center flex flex-col items-center justify-center ${
                            sel.storage === st
                              ? 'bg-teal-500 text-black shadow-md ring-1 ring-teal-300'
                              : 'bg-[#0F1115] text-slate-300 hover:bg-slate-800 border border-slate-800'
                          }`}
                        >
                          <span>{st}</span>
                          <span className={`text-[10px] ${sel.storage === st ? 'text-black/80 font-bold' : 'text-slate-400'}`}>${stPrice}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Swatch Selector */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Color: <strong className="text-slate-200">{sel.color}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {phone.colorVariants.map((cv) => (
                      <button
                        key={cv.name}
                        onClick={() => handleUpdateSelection(phone.id, 'color', cv.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          sel.color === cv.name ? 'border-teal-400 scale-110' : 'border-slate-700'
                        }`}
                        style={{ backgroundColor: cv.hex }}
                        title={cv.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
                <button
                  onClick={() => setActiveSpecsPhone(phone)}
                  className="p-2.5 rounded-xl bg-[#0F1115] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="View full specs"
                >
                  <Info className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onAddToCart(phone, sel.storage, sel.color)}
                  className="flex-1 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Add To Cart (${currentPricing.price})</span>
                </button>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Specs Quick View Modal */}
      {activeSpecsPhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-teal-400" />
                {activeSpecsPhone.name} Specs
              </h3>
              <button
                onClick={() => setActiveSpecsPhone(null)}
                className="p-1 rounded-full bg-[#16191E] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#16191E] border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-medium">Display</span>
                <span className="text-slate-100 font-semibold">{activeSpecsPhone.specs.display}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#16191E] border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-medium">Processor</span>
                <span className="text-slate-100 font-semibold">{activeSpecsPhone.specs.chipset}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#16191E] border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-medium">Camera</span>
                <span className="text-slate-100 font-semibold">{activeSpecsPhone.specs.camera}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#16191E] border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-medium">Battery</span>
                <span className="text-slate-100 font-semibold">{activeSpecsPhone.specs.battery}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#16191E] border border-slate-800 flex justify-between">
                <span className="text-slate-400 font-medium">Warranty</span>
                <span className="text-teal-400 font-bold">{activeSpecsPhone.specs.warranty}</span>
              </div>
            </div>

            <PriceDropNotifier
              productName={activeSpecsPhone.name}
              currentPrice={getPhonePrice(activeSpecsPhone, getPhoneSelection(activeSpecsPhone).storage).price}
              productId={activeSpecsPhone.id}
            />

            <button
              onClick={() => {
                const sel = getPhoneSelection(activeSpecsPhone);
                onAddToCart(activeSpecsPhone, sel.storage, sel.color);
                setActiveSpecsPhone(null);
              }}
              className="w-full py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-wider"
            >
              Add To Cart (${getPhonePrice(activeSpecsPhone, getPhoneSelection(activeSpecsPhone).storage).price})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
