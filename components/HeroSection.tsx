'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Banknote,
  Smartphone,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Gift,
  Package,
  Layers,
  Coins,
  ArrowRightLeft
} from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
  onTradeInClick: () => void;
  onBrowsePhonesClick: () => void;
  onAiAdvisorClick: () => void;
}

export default function HeroSection({
  onReserveClick,
  onTradeInClick,
  onBrowsePhonesClick,
  onAiAdvisorClick,
}: HeroSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse move handler for 3D tilt and specular sheen reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized rotation (-15 to +15 degrees)
    const rY = ((mouseX - width / 2) / (width / 2)) * 14;
    const rX = -((mouseY - height / 2) / (height / 2)) * 14;

    setRotateX(rX);
    setRotateY(rY);

    // Glare position percentage
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <section className="relative overflow-hidden bg-[#0A0B0E] text-slate-100 py-12 md:py-20 border-b border-slate-800/80">
      {/* 3D Dynamic Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Depth Grid Lines Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#2dd4bf 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: 'perspective(500px) rotateX(25deg) scale(1.2)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Messaging */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1115] border border-teal-500/30 text-slate-300 text-xs font-semibold shadow-lg shadow-teal-950/20">
              <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
              <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">3D Live Currency & Tech Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.15]">
              Exchange Foreign Cash & <br className="hidden sm:inline" />
              <span className="font-extrabold italic bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Trade Unlocked Devices
              </span>{' '}
              Instantly
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
              Lock in guaranteed zero-fee currency exchange rates online and pick up cash at any of our airport or city branches. Trade in pre-owned smartphones for immediate cash payouts or upgrade credit.
            </p>

            {/* Quick Feature Badges with 3D Hover Depth */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1115] border border-slate-800/80 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/40 transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">15+ Foreign Notes</div>
                  <div className="text-[11px] text-slate-400">Zero Commission</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1115] border border-slate-800/80 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/40 transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Phone Trade-In</div>
                  <div className="text-[11px] text-slate-400">Instant Cash Quote</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1115] border border-slate-800/80 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/40 transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Airport Counter</div>
                  <div className="text-[11px] text-slate-400">24/7 Express Pickup</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={onReserveClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-xl shadow-teal-950/50 transform active:scale-95 uppercase tracking-wider"
              >
                <Banknote className="w-4 h-4" />
                <span>Reserve Currency Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold text-xs sm:text-sm transition-all shadow-md transform active:scale-95 uppercase tracking-wider"
              >
                <Package className="w-4 h-4 text-teal-600" />
                <span>All Products Catalog</span>
              </Link>

              <button
                onClick={onTradeInClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0F1115] hover:bg-[#16191E] border border-slate-800 text-slate-200 font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <Smartphone className="w-4 h-4 text-teal-400" />
                <span className="uppercase tracking-wider">Trade-In Phone For Cash</span>
              </button>

              <button
                onClick={onAiAdvisorClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#0F1115] hover:bg-[#16191E] border border-slate-800 text-slate-300 font-semibold text-xs sm:text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>AI Travel Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Interactive 3D Card Stage */}
          <div className="lg:col-span-5 relative perspective-1000 py-4">
            {/* Floating 3D Coin Graphic Badge (Top Right Layer) */}
            <div 
              className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 backdrop-blur-md shadow-2xl animate-bounce"
              style={{
                animationDuration: '4s',
                transform: `translate3d(${rotateY * 0.8}px, ${-rotateX * 0.8}px, 60px)`
              }}
            >
              <Coins className="w-5 h-5 text-amber-400" />
              <div className="text-[11px] font-bold">
                <div className="text-white">Live Rate Lock</div>
                <div className="text-[9px] text-teal-400">Guaranteed 0% Markup</div>
              </div>
            </div>

            {/* Floating 3D Device Badge (Bottom Left Layer) */}
            <div 
              className="absolute -bottom-4 -left-3 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#16191E]/90 border border-slate-700 text-white backdrop-blur-md shadow-2xl"
              style={{
                transform: `translate3d(${-rotateY * 0.6}px, ${rotateX * 0.6}px, 70px)`,
                transition: isHovered ? 'none' : 'transform 0.5s ease-out'
              }}
            >
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-bold">
                <div>iPhone 16 Pro Max</div>
                <div className="text-[9px] font-mono text-teal-400">$1,149 USD • In Stock</div>
              </div>
            </div>

            {/* Main Interactive 3D Perspective Container */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="p-6 sm:p-7 rounded-3xl bg-[#0F1115]/90 border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-150 ease-out cursor-pointer select-none"
              style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
                  : 'perspective(1000px) rotateX(3deg) rotateY(-4deg) scale3d(1, 1, 1)',
                boxShadow: isHovered
                  ? '0 25px 50px -12px rgba(45, 212, 191, 0.25), 0 0 30px rgba(0, 0, 0, 0.8)'
                  : '0 20px 40px -15px rgba(0,0,0,0.7)'
              }}
            >
              {/* Dynamic 3D Specular Sheen / Reflection Layer */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)`,
                  opacity: glarePos.opacity,
                }}
              />

              {/* 3D Inner Layer 1: Top Header */}
              <div 
                className="flex items-center justify-between pb-4 border-b border-slate-800"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span className="font-bold text-xs uppercase tracking-[0.2em] text-teal-400">
                    Live Counter Exchange
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                  Updated Live
                </span>
              </div>

              {/* 3D Inner Layer 2: Exchange Calculator Snippets */}
              <div 
                className="space-y-3.5 my-5"
                style={{ transform: 'translateZ(45px)' }}
              >
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#16191E] border border-slate-800/80 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl drop-shadow">🇪🇺</span>
                    <div>
                      <div className="font-bold text-sm text-white">EUR / USD Exchange</div>
                      <div className="text-[11px] text-slate-400 font-mono">Buy €1 = $1.082 | Sell €1 = $1.069</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-extrabold text-teal-400">+0.34%</span>
                    <button
                      onClick={onReserveClick}
                      className="block text-[11px] text-teal-300 hover:text-teal-200 font-extrabold mt-0.5 underline"
                    >
                      Lock Rate →
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#16191E] border border-slate-800/80 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl drop-shadow">🇯🇵</span>
                    <div>
                      <div className="font-bold text-sm text-white">JPY / USD Exchange</div>
                      <div className="text-[11px] text-slate-400 font-mono">10,000 Yen = $64.89 USD</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-extrabold text-rose-400">-0.62%</span>
                    <button
                      onClick={onReserveClick}
                      className="block text-[11px] text-teal-300 hover:text-teal-200 font-extrabold mt-0.5 underline"
                    >
                      Lock Rate →
                    </button>
                  </div>
                </div>
              </div>

              {/* 3D Inner Layer 3: Special Bundle Box */}
              <div 
                className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 via-[#16191E] to-teal-950/60 border border-teal-500/30 flex items-center gap-3 shadow-lg"
                style={{ transform: 'translateZ(55px)' }}
              >
                <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Bundle & Save Bonus</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500 text-black text-[9px] font-black">$15 OFF</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                    Get $15 OFF any phone accessory or eSIM when exchanging $500+ foreign currency!
                  </div>
                </div>
              </div>

              {/* 3D Inner Layer 4: Interactive Footer Controls */}
              <div 
                className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80"
                style={{ transform: 'translateZ(35px)' }}
              >
                <button
                  onClick={onBrowsePhonesClick}
                  className="hover:text-teal-400 transition-colors font-semibold flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 text-teal-400" />
                  <span>Browse Unlocked Phones</span>
                </button>
                <span>•</span>
                <button
                  onClick={onTradeInClick}
                  className="hover:text-teal-400 transition-colors font-semibold flex items-center gap-1.5"
                >
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span>Trade-In Estimate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

