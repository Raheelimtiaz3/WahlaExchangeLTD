'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { RatesTicker } from '@/components/RatesTicker';
import { HeroSection } from '@/components/HeroSection';
import { MoneyRemittanceSection } from '@/components/MoneyRemittanceSection';
import { RemittanceModal } from '@/components/RemittanceModal';
import { CurrencyExchangeSection } from '@/components/CurrencyExchangeSection';
import { CurrencyReserveModal } from '@/components/CurrencyReserveModal';
import { SecurityTrustSection } from '@/components/SecurityTrustSection';
import { HowItWorks } from '@/components/HowItWorks';
import { MobileTechSection } from '@/components/MobileTechSection';
import { AdultRetailSection } from '@/components/AdultRetailSection';
import { RegulatoryInfoView } from '@/components/RegulatoryInfoView';
import { ComplaintsView } from '@/components/ComplaintsView';
import { AboutUsView } from '@/components/AboutUsView';
import { ContactSection } from '@/components/ContactSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailModal } from '@/components/ProductDetailModal';

import { ActivePageTab, CartItem, Currency, Product, RemittanceTransferOrder, ReservationVoucher } from '@/lib/types';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { MessageCircle } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActivePageTab>('home');
  const [liveCurrencies, setLiveCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string>('Live (NetDania Synced)');
  const [isRatesLoading, setIsRatesLoading] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('wahla_cart');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Remittance Modal state
  const [isRemittanceModalOpen, setIsRemittanceModalOpen] = useState(false);
  const [remittanceModalGbp, setRemittanceModalGbp] = useState(500);
  const [remittanceModalCorridor, setRemittanceModalCorridor] = useState('PKR');

  // Currency Reserve Modal state
  const [selectedReserveCurrency, setSelectedReserveCurrency] = useState<Currency | null>(null);

  // Fetch live rates from NetDania route
  const fetchLiveRates = React.useCallback(async () => {
    setIsRatesLoading(true);
    try {
      const res = await fetch('/api/live-rates');
      if (res.ok) {
        const data = await res.json();
        if (data && data.currencies && data.currencies.length > 0) {
          setLiveCurrencies(data.currencies);
          setRatesLastUpdated(new Date().toLocaleTimeString());
        }
      }
    } catch (e) {
      console.warn('Live rates sync error:', e);
    } finally {
      setIsRatesLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const loadRates = async () => {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok && !isCancelled) {
          const data = await res.json();
          if (data && data.currencies && data.currencies.length > 0) {
            setLiveCurrencies(data.currencies);
            setRatesLastUpdated(new Date().toLocaleTimeString());
          }
        }
      } catch (e) {
        console.warn('Live rates init error:', e);
      }
    };

    loadRates();
    const interval = setInterval(loadRates, 30000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wahla_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      subtitle: product.brand,
      price: product.price,
      type: product.category === 'vapes' ? 'vape' : 'phone',
      image: product.image,
      quantity: 1,
    };

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, newItem];
    });

    setIsCartOpen(true);
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

  const handleOpenRemittance = (amountGbp?: number, corridorCode?: string) => {
    if (amountGbp) setRemittanceModalGbp(amountGbp);
    if (corridorCode) setRemittanceModalCorridor(corridorCode);
    setIsRemittanceModalOpen(true);
  };

  const handleTabChange = (tab: ActivePageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FA] text-[#172033] font-sans antialiased">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRemittanceModal={() => handleOpenRemittance()}
      />

      {/* Live NetDania Forex Ticker */}
      <RatesTicker currencies={liveCurrencies} />

      {/* View Router / Homepage Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {activeTab === 'home' && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onSendMoneyClick={(gbp, corridor) => handleOpenRemittance(gbp, corridor)}
              onExploreFxClick={() => {
                const el = document.getElementById('currency-exchange');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Money Remittance (WAHLA MONEY) */}
            <MoneyRemittanceSection
              onOpenRemittanceModal={(gbp, corridor) => handleOpenRemittance(gbp, corridor)}
            />

            {/* 3. Currency Exchange (WAHLA FX) - Live NetDania Sync */}
            <CurrencyExchangeSection
              onReserveCurrency={(curr) => setSelectedReserveCurrency(curr)}
              initialCurrencies={liveCurrencies}
              lastUpdated={ratesLastUpdated}
              isLoading={isRatesLoading}
              onRefreshRates={fetchLiveRates}
            />

            {/* 4. Security & Trust Section */}
            <SecurityTrustSection />

            {/* 5. How It Works */}
            <HowItWorks />

            {/* 6. Mobile & Tech (WAHLA TECH) Preview */}
            <MobileTechSection
              onAddToCart={handleAddToCart}
              onOpenProductDetail={(prod) => setSelectedProduct(prod)}
            />

            {/* 7. FAQs */}
            <FaqSection />

            {/* 8. Contact & Branch */}
            <ContactSection />
          </>
        )}

        {activeTab === 'remittance' && (
          <MoneyRemittanceSection
            onOpenRemittanceModal={(gbp, corridor) => handleOpenRemittance(gbp, corridor)}
          />
        )}

        {activeTab === 'currency-exchange' && (
          <CurrencyExchangeSection
            onReserveCurrency={(curr) => setSelectedReserveCurrency(curr)}
            initialCurrencies={liveCurrencies}
            lastUpdated={ratesLastUpdated}
            isLoading={isRatesLoading}
            onRefreshRates={fetchLiveRates}
          />
        )}

        {activeTab === 'mobile-tech' && (
          <MobileTechSection
            onAddToCart={handleAddToCart}
            onOpenProductDetail={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activeTab === 'vapes-retail' && (
          <AdultRetailSection onAddToCart={handleAddToCart} />
        )}

        {activeTab === 'regulatory-info' && <RegulatoryInfoView />}

        {activeTab === 'complaints' && <ComplaintsView />}

        {activeTab === 'about-us' && <AboutUsView />}

        {activeTab === 'contact' && <ContactSection />}

      </main>

      {/* Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* Remittance Quote & Order Modal */}
      <RemittanceModal
        isOpen={isRemittanceModalOpen}
        onClose={() => setIsRemittanceModalOpen(false)}
        initialSendGbp={remittanceModalGbp}
        initialCorridorCode={remittanceModalCorridor}
        onConfirmOrder={(order: RemittanceTransferOrder) => {
          console.log('Remittance order created:', order);
        }}
      />

      {/* Currency Exchange Reserve Modal */}
      {selectedReserveCurrency && (
        <CurrencyReserveModal
          isOpen={!!selectedReserveCurrency}
          onClose={() => setSelectedReserveCurrency(null)}
          currency={selectedReserveCurrency}
          onConfirmReservation={(voucher: ReservationVoucher) => {
            console.log('Voucher created:', voucher);
          }}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Desk Action */}
      <a
        href="https://wa.me/441412660379"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#155EEF] hover:bg-blue-600 text-white rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 font-bold text-xs group cursor-pointer border border-blue-400/30"
        title="Chat with Glasgow Store Desk"
      >
        <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
        <span className="hidden group-hover:inline pr-1">Glasgow Counter WhatsApp</span>
      </a>

    </div>
  );
}

