'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CurrencyConverter from '@/components/CurrencyConverter';
import RatesTable from '@/components/RatesTable';
import CurrencyChartModal from '@/components/CurrencyChartModal';
import CurrencyReserveModal from '@/components/CurrencyReserveModal';
import RateAlertModal from '@/components/RateAlertModal';
import PhonesCatalog from '@/components/PhonesCatalog';
import PhoneTradeInCalculator from '@/components/PhoneTradeInCalculator';
import AccessoriesShop from '@/components/AccessoriesShop';
import AiAdvisor from '@/components/AiAdvisor';
import StoreLocator from '@/components/StoreLocator';
import CartDrawer from '@/components/CartDrawer';
import ReceiptModal from '@/components/ReceiptModal';
import ReservationsModal from '@/components/ReservationsModal';
import Footer from '@/components/Footer';
import RightCornerWidgets from '@/components/RightCornerWidgets';
import MobileBottomNav from '@/components/MobileBottomNav';

import { Currency, PhoneProduct, AccessoryProduct, CartItem, CurrencyReservation, TradeInQuote, StoreBranch } from '@/lib/types';
import { INITIAL_CURRENCIES } from '@/lib/currency-data';
import { CheckCircle2, Ticket, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('currency');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Reservations
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'acc-1',
      title: '65W GaN Dual USB-C Fast Travel Charger',
      subtitle: 'Includes US/EU/UK/AU Wall Plugs',
      price: 34.99,
      type: 'accessory',
      image: 'https://picsum.photos/seed/charger65w/600/600',
      quantity: 1,
    },
    {
      id: 'cart-init-2',
      productId: 'acc-3',
      title: 'Global Travel eSIM Pass (10GB 5G Data)',
      subtitle: 'Instant QR Email Activation',
      price: 19.99,
      type: 'accessory',
      image: 'https://picsum.photos/seed/esimtravel/600/600',
      quantity: 1,
    }
  ]);

  const [reservations, setReservations] = useState<CurrencyReservation[]>([
    {
      id: 'VCH-849102',
      currencyCode: 'EUR',
      currencyName: 'Euro',
      flag: '🇪🇺',
      amountForeign: 459.00,
      amountLocal: 500,
      type: 'buy',
      exchangeRate: 0.918,
      pickupLocation: 'Terminal 1 International Airport Counter',
      pickupDate: '2026-08-05',
      pickupTime: '24/7 Airport Express',
      customerName: 'Raheel Imtiaz',
      customerPhone: '+1 (555) 019-2834',
      customerEmail: 'raheel@example.com',
      status: 'Confirmed',
      createdAt: 'Aug 3, 2026, 11:20 PM',
      qrCodeSeed: 'VOUCHER-EUR-500-849102',
    }
  ]);

  // Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState<boolean>(false);

  const [chartCurrency, setChartCurrency] = useState<Currency | null>(null);
  const [reserveModalData, setReserveModalData] = useState<{
    currencyCode: string;
    currencyName: string;
    flag: string;
    amountForeign: number;
    amountLocal: number;
    type: 'buy' | 'sell';
    rate: number;
  } | null>(null);

  const [rateAlertCurrency, setRateAlertCurrency] = useState<Currency | null>(null);

  // Active Receipt Modal
  const [activeReceipt, setActiveReceipt] = useState<{
    reservation?: CurrencyReservation | null;
    orderData?: {
      orderId: string;
      itemsCount: number;
      total: number;
      discount: number;
      date: string;
    } | null;
  } | null>(null);

  // Quick Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Operations
  const handleAddPhoneToCart = (phone: PhoneProduct, selectedStorage: string, selectedColor: string) => {
    const newItem: CartItem = {
      id: `cart-${phone.id}-${selectedStorage}-${selectedColor}-${Date.now()}`,
      productId: phone.id,
      title: `${phone.name} (${selectedStorage})`,
      subtitle: `Color: ${selectedColor} • ${phone.condition}`,
      price: phone.price,
      type: 'phone',
      image: phone.image,
      quantity: 1,
      details: {
        storage: selectedStorage,
        color: selectedColor,
      }
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${phone.name} (${selectedStorage}) to cart!`);
    setIsCartOpen(true);
  };

  const handleAddAccessoryToCart = (acc: AccessoryProduct) => {
    const newItem: CartItem = {
      id: `cart-${acc.id}-${Date.now()}`,
      productId: acc.id,
      title: acc.name,
      subtitle: acc.category,
      price: acc.price,
      type: 'accessory',
      image: acc.image,
      quantity: 1,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${acc.name} to cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
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

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutSuccess = (total: number, discount: number) => {
    const receipt = {
      orderData: {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        itemsCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
        total,
        discount,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    };

    setCartItems([]);
    setIsCartOpen(false);
    setActiveReceipt(receipt);
  };

  // Currency Reservation Confirmation
  const handleConfirmReservation = (newRes: CurrencyReservation) => {
    setReservations((prev) => [newRes, ...prev]);
    setReserveModalData(null);
    setActiveReceipt({ reservation: newRes });
  };

  // Trade-In Voucher Claim
  const handleClaimTradeInVoucher = (quote: TradeInQuote) => {
    const tradeVoucher: CurrencyReservation = {
      id: `TRADE-${Math.floor(100000 + Math.random() * 900000)}`,
      currencyCode: 'USD',
      currencyName: 'US Dollar Cash Payout',
      flag: '🇺🇸',
      amountForeign: quote.estimatedCashValue,
      amountLocal: quote.estimatedCashValue,
      type: 'buy',
      exchangeRate: 1.0,
      pickupLocation: 'Financial District Flagship Hub (Trade-In Desk)',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTime: 'Express Desk',
      customerName: 'Customer Trade-In',
      customerPhone: 'Verified Counter',
      customerEmail: 'counter@wahlaexchange.com',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      qrCodeSeed: `TRADEIN-${quote.brand}-${quote.model}-${Date.now()}`,
    };

    setReservations((prev) => [tradeVoucher, ...prev]);
    setActiveReceipt({ reservation: tradeVoucher });
  };

  const handleApplyTradeInToCurrency = (creditAmount: number) => {
    setReserveModalData({
      currencyCode: 'EUR',
      currencyName: 'Euro',
      flag: '🇪🇺',
      amountForeign: Math.round(creditAmount * 0.918),
      amountLocal: creditAmount,
      type: 'buy',
      rate: 0.918,
    });
    showToast(`Applied $${creditAmount} Trade-In credit to currency reserve!`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-16 lg:pb-0">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        reservationsCount={reservations.length}
        onOpenReservations={() => setIsReservationsOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="space-y-12 pb-16">
        {/* Hero Banner */}
        <HeroSection
          onReserveClick={() => {
            const eur = INITIAL_CURRENCIES[0];
            setReserveModalData({
              currencyCode: eur.code,
              currencyName: eur.name,
              flag: eur.flag,
              amountForeign: 459,
              amountLocal: 500,
              type: 'buy',
              rate: eur.buyRate,
            });
          }}
          onTradeInClick={() => {
            setActiveTab('tradein');
            document.getElementById('tradein')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBrowsePhonesClick={() => {
            setActiveTab('phones');
            document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onAiAdvisorClick={() => {
            setActiveTab('ai-advisor');
            document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section 1: Live Converter Widget */}
          <CurrencyConverter
            onReserve={(data) => setReserveModalData(data)}
            onOpenRateAlert={(curr) => setRateAlertCurrency(curr)}
          />

          {/* Section 2: Live Currency Rates Board */}
          <RatesTable
            onOpenChart={(curr) => setChartCurrency(curr)}
            onReserve={(curr) =>
              setReserveModalData({
                currencyCode: curr.code,
                currencyName: curr.name,
                flag: curr.flag,
                amountForeign: Math.round(500 * curr.buyRate),
                amountLocal: 500,
                type: 'buy',
                rate: curr.buyRate,
              })
            }
            onOpenRateAlert={(curr) => setRateAlertCurrency(curr)}
            searchQuery={searchQuery}
          />

          {/* Section 3: Mobile Phones Showcase */}
          <PhonesCatalog
            onAddToCart={handleAddPhoneToCart}
            searchQuery={searchQuery}
          />

          {/* Section 4: Phone Trade-In Calculator */}
          <PhoneTradeInCalculator
            onApplyToCurrency={handleApplyTradeInToCurrency}
            onApplyToPhone={(creditVal) => {
              setActiveTab('phones');
              showToast(`Apply your $${creditVal} credit to any unlocked phone in store!`);
              document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onClaimVoucher={handleClaimTradeInVoucher}
          />

          {/* Section 5: Accessories & eSIM Shop */}
          <AccessoriesShop
            onAddToCart={handleAddAccessoryToCart}
            searchQuery={searchQuery}
          />

          {/* Section 6: AI Travel Advisor */}
          <AiAdvisor />

          {/* Section 7: Physical Counter Store Locator */}
          <StoreLocator
            onSelectBranch={(branch) => {
              const eur = INITIAL_CURRENCIES[0];
              setReserveModalData({
                currencyCode: eur.code,
                currencyName: eur.name,
                flag: eur.flag,
                amountForeign: 459,
                amountLocal: 500,
                type: 'buy',
                rate: eur.buyRate,
              });
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      {chartCurrency && (
        <CurrencyChartModal
          currency={chartCurrency}
          onClose={() => setChartCurrency(null)}
          onReserve={(curr) =>
            setReserveModalData({
              currencyCode: curr.code,
              currencyName: curr.name,
              flag: curr.flag,
              amountForeign: Math.round(500 * curr.buyRate),
              amountLocal: 500,
              type: 'buy',
              rate: curr.buyRate,
            })
          }
        />
      )}

      {reserveModalData && (
        <CurrencyReserveModal
          initialData={reserveModalData}
          onClose={() => setReserveModalData(null)}
          onConfirmReservation={handleConfirmReservation}
        />
      )}

      {rateAlertCurrency && (
        <RateAlertModal
          currency={rateAlertCurrency}
          onClose={() => setRateAlertCurrency(null)}
          onSaveAlert={(code, target, email) => {
            showToast(`Rate alert created for ${code} at $${target}!`);
          }}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <ReservationsModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        reservations={reservations}
        onViewVoucher={(res) => setActiveReceipt({ reservation: res })}
        onCancelReservation={(id) => {
          setReservations((prev) => prev.filter((r) => r.id !== id));
          showToast('Reservation cancelled.');
        }}
      />

      {activeReceipt && (
        <ReceiptModal
          reservation={activeReceipt.reservation}
          orderData={activeReceipt.orderData}
          onClose={() => setActiveReceipt(null)}
        />
      )}

      {/* WhatsApp Floating Right Corner Widget */}
      <RightCornerWidgets />

      {/* App-like Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
