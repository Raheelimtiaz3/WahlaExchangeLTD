'use client';

import React, { useState } from 'react';
import { Search, Ticket, ShoppingBag, Menu, X, CheckCircle2, PhoneCall, MapPin, Sparkles } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

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
    <header className="sticky top-0 z-40 bg-[#0F1115]/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-2xl">
      {/* Top Banner */}
      <div className="bg-teal-950/60 border-b border-teal-900/40 text-teal-300 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black bg-teal-400 text-slate-950 uppercase">
              Zero Commission
            </span>
            <span className="truncate">22 Maxwell Road, Glasgow, G41 1QE | Call: +44 1412660379</span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-[11px] text-teal-200">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-400" /> Glasgow Counter Open Mon-Sat</span>
            <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-teal-400" /> Instant Rate Lock</span>
          </div>
        </div>
      </div>

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

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-800/80 mt-3 pt-2.5 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="hover:text-teal-400 transition-colors flex items-center gap-1 py-1 font-semibold"
              >
                {item.id === 'ai-advisor' && <Sparkles className="w-3.5 h-3.5 text-teal-400" />}
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Glasgow Live Rates Active
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12151B] border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-slate-800/60 transition-colors font-medium text-left"
              >
                <span className="flex items-center gap-2">
                  {item.id === 'ai-advisor' && <Sparkles className="w-4 h-4 text-teal-400" />}
                  {item.label}
                </span>
                <span className="text-slate-500 text-xs">→</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

