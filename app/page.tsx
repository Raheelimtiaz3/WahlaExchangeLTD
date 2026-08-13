'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { RatesTicker } from '@/components/RatesTicker';
import { HeroSection } from '@/components/HeroSection';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { RatesTable } from '@/components/RatesTable';
import { PhonesCatalog } from '@/components/PhonesCatalog';
import { AccessoriesShop } from '@/components/AccessoriesShop';
import { PhoneTradeInCalculator } from '@/components/PhoneTradeInCalculator';
import { AiAdvisor } from '@/components/AiAdvisor';
import StoreLocator from '@/components/StoreLocator';
import { StoreInfoFooter } from '@/components/StoreInfoFooter';
import { CartDrawer } from '@/components/CartDrawer';
import { CurrencyReserveModal } from '@/components/CurrencyReserveModal';
import { ReservationsModal } from '@/components/ReservationsModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';

import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { FEATURED_PRODUCTS } from '@/lib/product-data';
import { Currency, CartItem, ReservationVoucher, Product, StoreBranch } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

export default function HomePage() {
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [vouchers, setVouchers] = useState<ReservationVoucher[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVouchersOpen, setIsVouchersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Reserve modal state
  const [selectedReserveCurrency, setSelectedReserveCurrency] = useState<Currency | null>(null);
  const [reserveForeignAmount, setReserveForeignAmount] = useState<number | undefined>(undefined);
  const [reserveCostGbp, setReserveCostGbp] = useState<number | undefined>(undefined);

  // Fetch live exchange rates from NetDania FX API
  const fetchLiveRates = useCallback(async () => {
    setIsLoadingRates(true);
    try {
      const res = await fetch('/api/live-rates');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.currencies) && data.currencies.length > 0) {
          setCurrencies(data.currencies);
          setLastUpdated(data.lastUpdated);
        }
      }
    } catch (err) {
      console.error('Error fetching live NetDania FX rates:', err);
    } finally {
      setIsLoadingRates(false);
    }
  }, []);

  // On mount: load local storage & start live rate polling
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('wahla_cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));

      const savedVouchers = localStorage.getItem('wahla_vouchers');
      if (savedVouchers) setVouchers(JSON.parse(savedVouchers));
    } catch (e) {
      console.error('Failed to load from local storage:', e);
    }

    // Initial fetch of NetDania FX rates
    fetchLiveRates();

    // Poll every 30 seconds for real-time market updates
    const interval = setInterval(() => {
      fetchLiveRates();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLiveRates]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wahla_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Sync vouchers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wahla_vouchers', JSON.stringify(vouchers));
    } catch (e) {
      console.error('Failed to save vouchers:', e);
    }
  }, [vouchers]);

  // Handlers for cart
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => setCartItems([]);

  // Handlers for Currency Reservation
  const handleOpenReserve = (curr: Currency, amountForeign?: number, costGbp?: number) => {
    setSelectedReserveCurrency(curr);
    setReserveForeignAmount(amountForeign);
    setReserveCostGbp(costGbp);
  };

  const handleConfirmReservation = (voucher: ReservationVoucher) => {
    setVouchers((prev) => [voucher, ...prev]);
    setIsVouchersOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => setIsVouchersOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        reservationsCount={vouchers.length}
        onSelectCategory={scrollToSection}
      />

      {/* Live Marquee Ticker */}
      <RatesTicker currencies={currencies} />

      {/* Hero Section */}
      <HeroSection
        onExploreRates={() => scrollToSection('currency-exchange')}
        onExplorePhones={() => scrollToSection('smartphones')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 py-8">
        
        {/* Currency Exchange & Live Calculator Grid */}
        <section id="currency-exchange" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <RatesTable
              currencies={currencies}
              onReserve={(curr) => handleOpenReserve(curr)}
              lastUpdated={lastUpdated}
              isLoading={isLoadingRates}
              onRefresh={fetchLiveRates}
            />
          </div>

          <div className="lg:col-span-5">
            <CurrencyConverter
              currencies={currencies}
              onReserveVoucher={(curr, foreign, gbp) => handleOpenReserve(curr, foreign, gbp)}
            />
          </div>
        </section>

        {/* Unlocked Smartphones Catalog */}
        <PhonesCatalog
          products={FEATURED_PRODUCTS}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Trade-In Calculator */}
        <PhoneTradeInCalculator />

        {/* Travel Accessories & eSIM */}
        <AccessoriesShop
          products={FEATURED_PRODUCTS}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Gemini AI Travel Advisor */}
        <AiAdvisor />

        {/* Store Counter & Map Location */}
        <StoreLocator
          onSelectBranch={(branch: StoreBranch) => {
            scrollToSection('currency-exchange');
          }}
        />

      </main>

      {/* Footer & Store Location */}
      <StoreInfoFooter />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Reserve Voucher Modal */}
      {selectedReserveCurrency && (
        <CurrencyReserveModal
          isOpen={!!selectedReserveCurrency}
          onClose={() => setSelectedReserveCurrency(null)}
          currency={selectedReserveCurrency}
          initialAmountForeign={reserveForeignAmount}
          initialCostGbp={reserveCostGbp}
          onConfirmReservation={handleConfirmReservation}
        />
      )}

      {/* Reservations / Vouchers Modal */}
      <ReservationsModal
        isOpen={isVouchersOpen}
        onClose={() => setIsVouchersOpen(false)}
        vouchers={vouchers}
      />

      {/* Floating WhatsApp Quick Action */}
      <a
        href="https://wa.me/441412660379"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 font-black text-xs group cursor-pointer"
        title="Chat with Glasgow Store on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden group-hover:inline pr-1">WhatsApp Glasgow Counter</span>
      </a>

    </div>
  );
}
