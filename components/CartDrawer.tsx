'use client';

import React from 'react';
import { CartItem } from '@/lib/types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const msg = `Hello Wahla Exchange, I would like to reserve/order these items:\n` +
      items.map((i) => `• ${i.name} (x${i.quantity}) - £${(i.price * i.quantity).toFixed(2)}`).join('\n') +
      `\n\nTotal: £${total.toFixed(2)}\nPickup: 22 Maxwell Road, Glasgow, G41 1QE`;
    window.open(`https://wa.me/441412660379?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col justify-between h-full shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900">Your Shopping Cart</h2>
            <span className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 font-bold">
              {items.length} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-500">Your cart is currently empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our unlocked smartphones, travel accessories, or currency rate vouchers.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-contain bg-white p-1 shrink-0 border border-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-extrabold text-slate-900 truncate">{item.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate font-medium">{item.subtitle}</p>
                  <span className="text-xs font-black text-blue-600">£{item.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg text-xs font-bold">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2 py-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 font-black text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2 py-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 font-bold">Total (Counter Pickup)</span>
              <span className="text-xl font-black text-slate-900">£{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>WhatsApp Counter Pickup Reserve</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Pay on counter pickup
              </span>
              <button onClick={onClearCart} className="hover:underline cursor-pointer">
                Clear Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
