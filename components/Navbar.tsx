'use client';

import React, { useState } from 'react';
import { ActivePageTab } from '@/lib/types';
import { REGULATORY_DETAILS } from '@/lib/remittance-data';
import {
  ShieldCheck,
  Send,
  Building2,
  PhoneCall,
  Menu,
  X,
  FileText,
  HelpCircle,
  Smartphone,
  CreditCard,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActivePageTab;
  onTabChange: (tab: ActivePageTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenRemittanceModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenRemittanceModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Building2 className="w-4 h-4" /> },
    { id: 'remittance', label: 'Money Remittance', icon: <Send className="w-4 h-4" /> },
    { id: 'currency-exchange', label: 'Currency Exchange', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'mobile-tech', label: 'Mobile & Tech', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'vapes-retail', label: 'Vapes (18+)', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'about-us', label: 'About Us', icon: <Building2 className="w-4 h-4" /> },
    { id: 'regulatory-info', label: 'Regulatory Info', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'complaints', label: 'Complaints', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActivePageTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1F33] border-b border-slate-800 text-white shadow-md">
      
      {/* Top Regulatory Disclosure Banner */}
      <div className="bg-[#071321] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left text-[11px] sm:text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Wahla Exchange Ltd</strong> — Registered PSD Agent (FCA FRN: {REGULATORY_DETAILS.fcaAgentFrn}) of Noble Travel & Money Exchange Ltd (FRN: {REGULATORY_DETAILS.principalFrn})
            </span>
          </div>
          <a
            href={REGULATORY_DETAILS.fcaRegisterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1 shrink-0"
          >
            <span>Verify on FCA Register</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-black text-white text-xl shadow-md border border-blue-500/30">
            W
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>WAHLA</span>
              <span className="text-blue-400 text-sm font-semibold tracking-normal uppercase bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                EXCHANGE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Money Remittance & Foreign Currency
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer border border-slate-700"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0B1F33]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Send Money */}
          <button
            onClick={onOpenRemittanceModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer border border-blue-400/30"
          >
            <Send className="w-4 h-4" />
            <span>Send Money</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071321] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-1 gap-1 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenRemittanceModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Money Worldwide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
