'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PhonesCatalog from '@/components/PhonesCatalog';
import AccessoriesShop from '@/components/AccessoriesShop';
import StoreInfoFooter from '@/components/StoreInfoFooter';
import CartDrawer from '@/components/CartDrawer';
import ReservationsModal from '@/components/ReservationsModal';
import { FEATURED_PRODUCTS, PHONES_DATA, ACCESSORIES_DATA } from '@/lib/product-data';
import { CartItem, ReservationVoucher } from '@/lib/types';

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [vouchers, setVouchers] = useState<ReservationVoucher[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVouchersOpen, setIsVouchersOpen] = useState(false);

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

  const productsList = FEATURED_PRODUCTS || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1115] text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => setIsVouchersOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        reservationsCount={vouchers.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="border-b border-slate-800 pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Glasgow Tech Center
          </span>
          <h1 className="text-3xl font-black text-white mt-1">
            Unlocked Phones & Travel Accessories
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Reserve online and pay on pickup at 22 Maxwell Road, Glasgow, G41 1QE.
          </p>
        </div>

        <PhonesCatalog products={productsList} onAddToCart={handleAddToCart} />
        <AccessoriesShop products={productsList} onAddToCart={handleAddToCart} />
      </main>

      <StoreInfoFooter />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      <ReservationsModal
        isOpen={isVouchersOpen}
        onClose={() => setIsVouchersOpen(false)}
        vouchers={vouchers}
      />
    </div>
  );
}
