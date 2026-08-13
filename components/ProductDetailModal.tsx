'use client';

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/types';
import {
  X,
  Star,
  ShoppingBag,
  Check,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string; image: string } | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      const defaultStorage = product.storageOptions?.[0] || '256GB';
      const defaultColor = product.colorVariants?.[0] || null;
      setSelectedStorage(defaultStorage);
      setSelectedColor(defaultColor);
      setCurrentImage(defaultColor?.image || product.image);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const selectedStoragePricing = product.storagePrices?.find(
    (sp) => sp.storage === selectedStorage
  );
  const activePrice = selectedStoragePricing ? selectedStoragePricing.price : product.price;
  const activeOriginalPrice = selectedStoragePricing
    ? selectedStoragePricing.originalPrice
    : product.originalPrice;

  const handleColorChange = (color: { name: string; hex: string; image: string }) => {
    setSelectedColor(color);
    if (color.image) {
      setCurrentImage(color.image);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: `${product.id}-${selectedStorage || 'default'}-${selectedColor?.name || 'default'}`,
      name: product.name,
      subtitle: `${product.brand} • ${selectedColor?.name || 'Standard'} ${selectedStorage ? `• ${selectedStorage}` : ''}`,
      price: activePrice,
      type: product.category === 'smartphones' ? 'phone' : 'accessory',
      image: currentImage || product.image,
      quantity: quantity,
      specs: {
        storage: selectedStorage,
        color: selectedColor?.name,
      },
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const discountPercent = activeOriginalPrice
    ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              {product.brand}
            </span>
            <span className="text-xs text-slate-500 font-bold truncate max-w-[200px] sm:max-w-xs">
              {product.category === 'smartphones' ? 'Certified Unlocked Smartphone' : 'Genuine Tech Accessory'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Badges */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="relative w-full aspect-square rounded-2xl bg-slate-50 border border-slate-200 p-6 flex items-center justify-center overflow-hidden group">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-emerald-600 text-[10px] font-black text-white shadow-xs">
                  {product.badge}
                </span>
              )}

              {discountPercent > 0 && (
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-rose-600 text-white text-[11px] font-black shadow-xs">
                  -{discountPercent}% OFF
                </span>
              )}

              <img
                src={currentImage || product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = 'true';
                    img.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                  }
                }}
              />
            </div>

            {/* Color Swatches Selection */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">Color Variant:</span>
                  <span className="font-extrabold text-emerald-700">{selectedColor?.name || 'Default'}</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  {product.colorVariants.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor?.name === color.name
                          ? 'border-emerald-600 scale-110 shadow-sm'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.name === color.name && (
                        <Check className="w-4 h-4 text-white drop-shadow-md" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Store Guarantee Box */}
            <div className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2 font-black text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wahla Store Guarantee Included</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                All devices are 100% genuine, fully factory unlocked, tested by technicians, and backed by a 1-Year Glasgow Store Warranty.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[10px] text-slate-600 font-bold border-t border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pickup Available: 22 Maxwell Road, Glasgow, G41 1QE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specs, Options, Cart CTA */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Title & Ratings */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-amber-600 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">({product.reviewsCount} customer reviews)</span>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    In Stock at Glasgow Counter
                  </span>
                </div>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">
                    Glasgow Counter Price ({selectedStorage || 'Standard'})
                  </span>
                  <div className="flex items-baseline gap-3 mt-0.5">
                    <span className="text-3xl font-black text-slate-900">£{activePrice.toFixed(2)}</span>
                    {activeOriginalPrice && (
                      <span className="text-base text-slate-400 line-through font-medium">
                        £{activeOriginalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-700 font-black uppercase block">0% Commission</span>
                  <span className="text-[11px] text-slate-500 font-medium">VAT Receipt Provided</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Storage Options with Separate Prices */}
              {product.storageOptions && product.storageOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Select Memory Capacity:
                    </label>
                    <span className="text-[11px] text-emerald-700 font-black">
                      Separate Storage Pricing
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.storageOptions.map((storage) => {
                      const sp = product.storagePrices?.find((s) => s.storage === storage);
                      const optPrice = sp ? sp.price : product.price;
                      const isSelected = selectedStorage === storage;

                      return (
                        <button
                          key={storage}
                          onClick={() => setSelectedStorage(storage)}
                          className={`p-3 rounded-xl text-left flex flex-col justify-between border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {storage}
                          </span>
                          <span className={`text-[11px] font-extrabold mt-1 ${isSelected ? 'text-emerald-400' : 'text-emerald-700'}`}>
                            £{optPrice.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Specifications Breakdown */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Key Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col"
                      >
                        <span className="text-[10px] text-slate-500 font-bold uppercase">{key}</span>
                        <span className="text-slate-900 font-extrabold mt-0.5">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity & Add to Cart / WhatsApp */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart • £{(activePrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Quick Inquiry */}
              <a
                href={`https://wa.me/441412660379?text=${encodeURIComponent(
                  `Hi Wahla Exchange, I am interested in ${product.name} (${selectedStorage || ''} ${selectedColor?.name || ''}). Is this available for counter pickup at 22 Maxwell Road?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-emerald-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ask Glasgow Counter on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;
