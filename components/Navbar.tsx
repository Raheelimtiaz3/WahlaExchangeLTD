'use client';

import React, { useState } from 'react';
import { Ticket, ShoppingBag, Menu, X, CheckCircle2, PhoneCall, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenReservations: () => void;
  cartCount: number;
  reservationsCount: number;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenReservations,
  cartCount,
  reservationsCount,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Rates & Exchange', id: 'currency-exchange' },
    { label: 'Smartphones', id: 'smartphones' },
    { label: 'Accessories', id: 'accessories' },
    { label: 'Phone Trade-In', id: 'trade-in' },
    { label: 'AI Travel Advisor', id: 'ai-advisor' },
    { label: 'Glasgow Branch', id: 'store-location' },
  ];

  const handleNavClick = (item: { label: string; id: string }) => {
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(item.id);
    }
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Banner */}
      <div className="bg-emerald-950/90 border-b border-emerald-800/40 text-emerald-200 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-slate-950 uppercase tracking-wider">
              0% Commission
            </span>
            <span className="truncate font-medium text-slate-200">22 Maxwell Road, Glasgow, G41 1QE | Tel: +44 141 266 0379</span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px] text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Counter Open Mon-Sat 8am-9pm</span>
            <span className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Instant Rate Lock</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => handleNavClick(navItems[0])}>
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg sm:text-xl shadow-md shadow-emerald-950/40 shrink-0">
              W
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-black text-base sm:text-xl tracking-tight text-white">
                  WAHLA <span className="text-emerald-400">EXCHANGE</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] sm:text-xs text-slate-400 font-bold">LTD</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Glasgow Travel Money & Tech Bureau</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 py-1"
              >
                {item.id === 'ai-advisor' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenReservations}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
              title="View your currency pickup reservations"
            >
              <Ticket className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Vouchers</span>
              {reservationsCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-black leading-none text-slate-950 bg-emerald-400 rounded-full">
                  {reservationsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Cart</span>
              {cartCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-black leading-none text-emerald-400 bg-slate-950 rounded-full">
                  {cartCount}
                </span>
              ) : (
                <span className="sm:hidden text-[10px] font-extrabold">Cart</span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-2">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-slate-800 transition-colors font-bold text-left"
              >
                <span className="flex items-center gap-2">
                  {item.id === 'ai-advisor' && <Sparkles className="w-4 h-4 text-emerald-400" />}
                  {item.label}
                </span>
                <span className="text-emerald-400 text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
