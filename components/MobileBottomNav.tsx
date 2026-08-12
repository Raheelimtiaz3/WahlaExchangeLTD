'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Banknote,
  Smartphone,
  Headphones,
  RefreshCw,
  ShoppingBag,
  MapPin,
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    { id: 'currency', label: 'Rates', icon: Banknote },
    { id: 'phones', label: 'Phones', icon: Smartphone },
    { id: 'accessories', label: 'Gear', icon: Headphones },
    { id: 'tradein', label: 'Trade-In', icon: RefreshCw },
    { id: 'locations', label: 'Counters', icon: MapPin },
  ];

  const handleTabClick = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0F1D]/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-8px_25px_rgba(0,0,0,0.8)] px-2 py-1.5 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all min-w-[56px] ${
              isActive
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-sans truncate max-w-[60px]">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Cart Quick Action */}
      <button
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-400 hover:text-white transition-all min-w-[56px] relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-emerald-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-black text-black bg-emerald-400 rounded-full border border-slate-900 shadow">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight font-sans font-bold text-white">
          Cart
        </span>
      </button>
    </div>
  );
}
