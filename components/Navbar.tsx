'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Banknote,
  Smartphone,
  Headphones,
  MapPin,
  Sparkles,
  ShoppingBag,
  Ticket,
  Search,
  Menu,
  X,
  RefreshCw,
  Clock,
  PhoneCall,
  CheckCircle2,
  Package
} from 'lucide-react';
import RatesTicker from './RatesTicker';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  reservationsCount: number;
  onOpenReservations: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  reservationsCount,
  onOpenReservations,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'currency', label: 'Currency Exchange', icon: Banknote },
    { id: 'all-products', label: 'All Products Page', icon: Package, isPage: true, href: '/products', badge: 'New' },
    { id: 'phones', label: 'Mobile Phones', icon: Smartphone },
    { id: 'accessories', label: 'Accessories & eSIM', icon: Headphones },
    { id: 'tradein', label: 'Trade-In Calculator', icon: RefreshCw },
    { id: 'locations', label: 'Store Counters', icon: MapPin },
    { id: 'ai-advisor', label: 'AI Travel Advisor', icon: Sparkles, badge: 'AI' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    if (item.isPage && item.href) {
      router.push(item.href);
      return;
    }
    if (pathname !== '/') {
      router.push(`/#${item.id}`);
      return;
    }
    setActiveTab(item.id);
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-2xl">
      <RatesTicker />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handleNavClick(navItems[0])}>
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-500 text-slate-950 font-black text-base sm:text-lg shadow-md shadow-teal-950/50 shrink-0">
              W
            </div>
            <div>
              <div className="flex items-center gap-1 leading-tight">
                <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-white font-sans">
                  WAHLA <span className="text-teal-400">EXCHANGE</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] sm:text-xs text-slate-400 font-bold">LTD</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-400 shrink-0" />
                <span className="truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">Foreign Exchange & Tech</span>
              </p>
            </div>
          </div>

          {/* Quick Search Bar (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm relative mx-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search currencies (EUR, JPY), phones, accessories..."
              className="w-full pl-9 pr-4 py-2 bg-[#16191E] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Reservations / Vouchers Button */}
            <button
              onClick={onOpenReservations}
              className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              title="View your currency pickup reservations"
            >
              <Ticket className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="hidden sm:inline">Vouchers</span>
              {reservationsCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-black leading-none text-slate-950 bg-teal-400 rounded-full">
                  {reservationsCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Cart</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-black leading-none text-teal-400 bg-slate-950 rounded-full">
                  {cartCount}
                </span>
              ) : (
                <span className="sm:hidden text-[10px] font-extrabold">Cart</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-[#16191E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-teal-500/20 text-teal-400 border border-teal-500/40 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              Airport Counter: <strong className="text-slate-200 font-semibold">24/7 Open</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
              Hotline: <strong className="text-slate-200 font-semibold">+44 1412660379</strong>
            </span>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 space-y-3 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto pb-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search currencies, phones, accessories..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#16191E] border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                        : 'text-slate-200 hover:bg-[#16191E] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Contact & Counter Info for Mobile */}
            <div className="p-3 rounded-xl bg-[#16191E] border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Airport Counter:</span>
                </span>
                <span className="font-bold text-teal-300">24/7 Open</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                  <span>Glasgow Hotline:</span>
                </span>
                <a href="tel:+441412660379" className="font-bold text-teal-400 hover:underline">
                  +44 1412660379
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
