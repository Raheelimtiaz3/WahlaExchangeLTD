/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { CartItem } from '@/lib/types';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Gift
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutSuccess: (orderTotal: number, discountApplied: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponMessage('✓ 10% Welcome Discount Applied!');
    } else if (clean === 'TRAVELFREE' || clean === 'WAHLA15') {
      setDiscountPercent(15);
      setCouponMessage('✓ 15% Travel Special Discount Applied!');
    } else {
      setCouponMessage('Invalid coupon code. Try "WELCOME10" or "WAHLA15"');
    }
  };

  const handleCheckout = () => {
    onCheckoutSuccess(total, discountAmount);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0F1115] border-l border-slate-800 max-w-md w-full h-full flex flex-col justify-between p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Your Shopping Cart</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#16191E] border border-slate-800 text-xs font-mono font-bold text-slate-300">
              {items.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#16191E] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-xs font-medium">Your shopping cart is currently empty.</p>
              <p className="text-[11px] text-slate-600">Browse phones, accessories, or reserve foreign currency notes!</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-[#16191E] border border-slate-800 flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain rounded-xl bg-[#0F1115] p-1 border border-slate-800 shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                  )}
                  <div className="text-xs font-mono font-extrabold text-teal-400 mt-1">
                    ${item.price}
                  </div>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-1.5 bg-[#0F1115] p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-mono font-bold text-white px-1">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo Code (e.g. WELCOME10)"
                className="flex-1 bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-[#16191E] hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p
                className={`text-[11px] font-medium ${
                  discountPercent > 0 ? 'text-teal-400' : 'text-rose-400'
                }`}
              >
                {couponMessage}
              </p>
            )}

            {/* Fulfillment Options */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold">Fulfillment Method:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFulfillmentType('pickup')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    fulfillmentType === 'pickup'
                      ? 'bg-teal-500 text-black'
                      : 'bg-[#16191E] text-slate-400 border border-slate-800'
                  }`}
                >
                  Store Counter Pickup
                </button>
                <button
                  onClick={() => setFulfillmentType('delivery')}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    fulfillmentType === 'delivery'
                      ? 'bg-teal-500 text-black'
                      : 'bg-[#16191E] text-slate-400 border border-slate-800'
                  }`}
                >
                  Express Courier
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-teal-400 font-medium">
                  <span>Discount</span>
                  <span className="font-mono">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="font-mono text-teal-400">${total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-white hover:bg-slate-200 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-wider"
            >
              <span>Confirm Order & Issue Digital Receipt</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
