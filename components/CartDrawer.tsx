'use client';

import React from 'react';
import { CartItem } from '@/lib/types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#14171F] border-l border-slate-800 text-slate-100 flex flex-col justify-between h-full shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-400" />
            <h2 className="font-extrabold text-base sm:text-lg text-white">Your Shopping Cart</h2>
            <span className="text-xs bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800/60 font-bold">
              {items.length} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-400">Your cart is currently empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our unlocked smartphones, travel accessories, or currency rate vouchers.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#0B0D12] border border-slate-800 flex items-center justify-between gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-contain bg-[#14171F] p-1 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                  <span className="text-xs font-black text-teal-400">£{item.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center bg-[#14171F] border border-slate-800 rounded-lg text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="px-2 py-1 text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="px-2 py-1 text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
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
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0B0D12] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-bold">Total (Counter Pickup)</span>
              <span className="text-xl font-black text-white">£{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>WhatsApp Counter Pickup Reserve</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Pay on counter pickup
              </span>
              <button onClick={onClearCart} className="hover:underline">
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

