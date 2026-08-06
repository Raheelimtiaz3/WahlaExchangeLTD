/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ReceiptModal from '@/components/ReceiptModal';
import ReservationsModal from '@/components/ReservationsModal';
import { PHONES_DATA, ACCESSORIES_DATA } from '@/lib/product-data';
import { PhoneProduct, AccessoryProduct, CartItem, CurrencyReservation } from '@/lib/types';
import {
  Smartphone,
  Headphones,
  ShoppingBag,
  Star,
  CheckCircle2,
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  ArrowLeft,
  X,
  Zap,
  ShieldCheck,
  Tag,
  Eye,
  Check,
  ZoomIn
} from 'lucide-react';
import PriceDropNotifier from '@/components/PriceDropNotifier';
import Card3D from '@/components/Card3D';
import RightCornerWidgets from '@/components/RightCornerWidgets';

function createCartId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Selected Product Detail Modal
  const [detailProduct, setDetailProduct] = useState<{
    type: 'phone' | 'accessory';
    item: PhoneProduct | AccessoryProduct;
    activeImage: string;
    activeColor?: string;
    activeStorage?: string;
  } | null>(null);

  // Cart & Reservations state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'acc-1',
      title: '65W GaN Dual USB-C Fast Travel Charger',
      subtitle: 'Includes US/EU/UK/AU Wall Plugs',
      price: 34.99,
      type: 'accessory',
      image: '/images/travel_charger_gan_1785825950711.jpg',
      quantity: 1,
    }
  ]);
  const [reservations, setReservations] = useState<CurrencyReservation[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState<boolean>(false);
  const [activeReceipt, setActiveReceipt] = useState<{
    reservation?: CurrencyReservation | null;
    orderData?: any;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddPhoneToCart = (phone: PhoneProduct, storage: string, color: string, image: string) => {
    const newItem: CartItem = {
      id: createCartId(`cart-${phone.id}-${storage}-${color}`),
      productId: phone.id,
      title: `${phone.name} (${storage})`,
      subtitle: `Color: ${color} • ${phone.condition}`,
      price: phone.price,
      type: 'phone',
      image: image || phone.image,
      quantity: 1,
      details: { storage, color }
    };
    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${phone.name} to cart!`);
    setIsCartOpen(true);
  };

  const handleAddAccessoryToCart = (acc: AccessoryProduct) => {
    const newItem: CartItem = {
      id: createCartId(`cart-${acc.id}`),
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

  // Filter combinations
  const allPhonesFormatted = PHONES_DATA.map(p => ({ ...p, itemType: 'phone' as const }));
  const allAccessoriesFormatted = ACCESSORIES_DATA.map(a => ({ ...a, itemType: 'accessory' as const }));

  const categoryOptions = [
    'All',
    'Smartphones',
    'Chargers & Cables',
    'Power Banks',
    'Travel eSIM & SIMs',
    'Adapters',
    'Audio & Wireless',
    'Cases & Glass'
  ];

  const brandOptions = ['All', 'Apple', 'Samsung', 'Google', 'Xiaomi'];

  const filteredItems = [...allPhonesFormatted, ...allAccessoriesFormatted].filter((item) => {
    if (item.itemType === 'phone') {
      const phone = item as PhoneProduct & { itemType: 'phone' };
      const matchesCategory = selectedCategory === 'All' || selectedCategory === 'Smartphones';
      const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
      const matchesSearch =
        phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    } else {
      const acc = item as AccessoryProduct & { itemType: 'accessory' };
      const matchesCategory = selectedCategory === 'All' || acc.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All'; // accessories are universal/multi-brand
      const matchesSearch =
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    }
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-400 text-black px-4 py-3 rounded-2xl font-extrabold text-xs shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium mb-1">
              <Link href="/" className="hover:underline flex items-center gap-1 text-slate-400 hover:text-white">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home & Exchange
              </Link>
              <span>•</span>
              <span className="text-teal-400 font-bold uppercase tracking-wider">Wahla Products Store</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              All Products & Unlocked Tech Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Browse our complete range of certified unlocked smartphones, global travel eSIM data passes, 65W GaN fast chargers, magnetic power banks, and essential accessories with 0% hidden markup.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-bold">
              {filteredItems.length} Products Available
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#0F1115] border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, model, or feature..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#16191E] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-teal-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#16191E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-[#16191E] p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'grid' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs ${
                  viewMode === 'list' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">Categories:</span>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-black font-extrabold shadow-md'
                    : 'bg-[#16191E] text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Brand Chips (if Smartphones selected or All) */}
          {(selectedCategory === 'All' || selectedCategory === 'Smartphones') && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-slate-800/80 pt-3">
              <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">Brand Filter:</span>
              {brandOptions.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-lg whitespace-nowrap text-xs transition-all ${
                    selectedBrand === brand
                      ? 'bg-white text-black font-bold'
                      : 'bg-[#16191E] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Display Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-[#0F1115] border border-slate-800 rounded-3xl space-y-4">
            <Search className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Products Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try adjusting your search keywords or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBrand('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-teal-500 text-black font-bold text-xs rounded-full uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {filteredItems.map((item) => {
              if (item.itemType === 'phone') {
                const phone = item as PhoneProduct & { itemType: 'phone' };
                return (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    viewMode={viewMode}
                    onOpenDetail={() =>
                      setDetailProduct({
                        type: 'phone',
                        item: phone,
                        activeImage: phone.image,
                        activeColor: phone.colorVariants[0]?.name,
                        activeStorage: phone.storageOptions[0],
                      })
                    }
                    onAddToCart={(storage, color, image) =>
                      handleAddPhoneToCart(phone, storage, color, image)
                    }
                  />
                );
              } else {
                const acc = item as AccessoryProduct & { itemType: 'accessory' };
                return (
                  <AccessoryCard
                    key={acc.id}
                    acc={acc}
                    viewMode={viewMode}
                    onOpenDetail={() =>
                      setDetailProduct({
                        type: 'accessory',
                        item: acc,
                        activeImage: acc.image,
                      })
                    }
                    onAddToCart={() => handleAddAccessoryToCart(acc)}
                  />
                );
              }
            })}
          </div>
        )}
      </main>

      {/* Detailed Product Modal */}
      {detailProduct && (
        <DetailModal
          data={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToCartPhone={(storage, color, image) => {
            handleAddPhoneToCart(detailProduct.item as PhoneProduct, storage, color, image);
            setDetailProduct(null);
          }}
          onAddToCartAccessory={() => {
            handleAddAccessoryToCart(detailProduct.item as AccessoryProduct);
            setDetailProduct(null);
          }}
        />
      )}

      <Footer />

      {/* Modals & Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, delta) => {
          setCartItems((prev) =>
            prev
              .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
              .filter((item) => item.quantity > 0)
          );
        }}
        onRemoveItem={(id) => setCartItems((prev) => prev.filter((i) => i.id !== id))}
        onCheckoutSuccess={(total, discount) => {
          setActiveReceipt({
            orderData: {
              orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
              itemsCount: cartItems.reduce((a, i) => a + i.quantity, 0),
              total,
              discount,
              date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
            }
          });
          setCartItems([]);
          setIsCartOpen(false);
        }}
      />

      <ReservationsModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        reservations={reservations}
        onViewVoucher={(res) => setActiveReceipt({ reservation: res })}
        onCancelReservation={(id) => setReservations((prev) => prev.filter((r) => r.id !== id))}
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
    </div>
  );
}

// Subcomponent: Phone Card
function PhoneCard({
  phone,
  viewMode,
  onOpenDetail,
  onAddToCart,
}: {
  phone: PhoneProduct;
  viewMode: 'grid' | 'list';
  onOpenDetail: () => void;
  onAddToCart: (storage: string, color: string, image: string) => void;
}) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [selectedStorage, setSelectedStorage] = useState<string>(
    phone.selectedStorage || phone.storageOptions[0]
  );

  const activeColor = phone.colorVariants[selectedColorIndex];
  const activeImage = activeColor?.image || phone.image;

  if (viewMode === 'list') {
    return (
      <div className="bg-[#0F1115] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:border-slate-700 transition-all">
        <div className="relative w-32 h-32 bg-[#16191E] rounded-xl p-2 shrink-0 border border-slate-800/80 cursor-pointer" onClick={onOpenDetail}>
          <img
            src={activeImage}
            alt={phone.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {phone.isBestseller && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-teal-500 text-black text-[9px] font-extrabold uppercase">
              Bestseller
            </span>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-bold uppercase">
              {phone.brand}
            </span>
            <span className="text-xs text-slate-400">• {phone.condition}</span>
          </div>

          <h3 className="text-base font-bold text-white hover:text-teal-400 cursor-pointer" onClick={onOpenDetail}>
            {phone.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1">{phone.specs.display} • {phone.specs.chipset}</p>

          {/* Color Switcher */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] text-slate-500">Color:</span>
            {phone.colorVariants.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'ring-2 ring-teal-400 scale-110' : 'border-slate-700 opacity-80'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="sm:text-right shrink-0 space-y-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
          <div>
            <div className="text-lg font-mono font-extrabold text-teal-400">${phone.price}</div>
            {phone.originalPrice && (
              <div className="text-xs text-slate-500 line-through font-mono">${phone.originalPrice}</div>
            )}
          </div>

          <div className="flex sm:flex-col gap-2">
            <button
              onClick={onOpenDetail}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-[#16191E] hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Specs
            </button>
            <button
              onClick={() => onAddToCart(selectedStorage, activeColor?.name || 'Standard', activeImage)}
              className="flex-1 sm:flex-none px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card3D className="bg-[#0F1115] border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700/80 transition-all shadow-lg group">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-extrabold uppercase tracking-wider">
            {phone.brand}
          </span>

          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            {phone.condition}
          </span>
        </div>

        {/* Product Image */}
        <div 
          className="relative h-48 bg-[#16191E] rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-slate-800/80 group-hover:border-teal-500/30 transition-all cursor-pointer" 
          onClick={onOpenDetail}
          style={{ transform: 'translateZ(25px)' }}
        >
          <img
            src={activeImage}
            alt={phone.name}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {phone.isBestseller && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-teal-500 text-black text-[9px] font-extrabold uppercase tracking-wider">
              Bestseller
            </span>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail();
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-xl uppercase tracking-wider transition-all transform translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Title & Ratings */}
        <div>
          <h3
            onClick={onOpenDetail}
            className="text-sm font-bold text-white hover:text-teal-400 cursor-pointer line-clamp-1"
          >
            {phone.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1">{phone.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500">({phone.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="space-y-1 pt-1 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Color: <strong className="text-slate-200">{activeColor?.name}</strong></span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {phone.colorVariants.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-5 h-5 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'ring-2 ring-teal-400 scale-110' : 'border-slate-700 opacity-80'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Storage Options */}
        <div className="flex items-center gap-1.5 pt-1">
          {phone.storageOptions.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStorage(st)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                selectedStorage === st
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                  : 'bg-[#16191E] text-slate-400 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Price & Action */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <div>
          <div className="text-base font-mono font-extrabold text-teal-400">${phone.price}</div>
          {phone.originalPrice && (
            <div className="text-[10px] text-slate-500 line-through font-mono">${phone.originalPrice}</div>
          )}
        </div>

        <button
          onClick={() => onAddToCart(selectedStorage, activeColor?.name || 'Standard', activeImage)}
          className="px-3.5 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all uppercase tracking-wider"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </Card3D>
  );
}

// Subcomponent: Accessory Card
function AccessoryCard({
  acc,
  viewMode,
  onOpenDetail,
  onAddToCart,
}: {
  acc: AccessoryProduct;
  viewMode: 'grid' | 'list';
  onOpenDetail: () => void;
  onAddToCart: () => void;
}) {
  if (viewMode === 'list') {
    return (
      <div className="bg-[#0F1115] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5 hover:border-slate-700 transition-all">
        <div className="relative w-28 h-28 bg-[#16191E] rounded-xl p-2 shrink-0 border border-slate-800/80 cursor-pointer" onClick={onOpenDetail}>
          <img
            src={acc.image}
            alt={acc.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <span className="px-2 py-0.5 rounded bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-bold uppercase">
            {acc.category}
          </span>
          <h3 className="text-sm font-bold text-white hover:text-teal-400 cursor-pointer" onClick={onOpenDetail}>
            {acc.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-1">{acc.description}</p>
        </div>

        <div className="sm:text-right shrink-0 space-y-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
          <div className="text-base font-mono font-extrabold text-teal-400">${acc.price}</div>
          <button
            onClick={onAddToCart}
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-white hover:bg-slate-200 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    );
  }

  return (
    <Card3D className="bg-[#0F1115] border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700/80 transition-all shadow-lg group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-md bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-extrabold uppercase tracking-wider">
            {acc.category}
          </span>
          {acc.badge && (
            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
              {acc.badge}
            </span>
          )}
        </div>

        <div 
          className="relative h-44 bg-[#16191E] rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-slate-800/80 group-hover:border-teal-500/30 transition-all cursor-pointer" 
          onClick={onOpenDetail}
          style={{ transform: 'translateZ(25px)' }}
        >
          <img
            src={acc.image}
            alt={acc.name}
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail();
              }}
              className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-xl uppercase tracking-wider transition-all transform translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        <div>
          <h3
            onClick={onOpenDetail}
            className="text-xs sm:text-sm font-bold text-white hover:text-teal-400 cursor-pointer line-clamp-2"
          >
            {acc.name}
          </h3>
          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{acc.description}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <div>
          <div className="text-base font-mono font-extrabold text-teal-400">${acc.price}</div>
          {acc.originalPrice && (
            <div className="text-[10px] text-slate-500 line-through font-mono">${acc.originalPrice}</div>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="px-3.5 py-2 rounded-full bg-white hover:bg-slate-200 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all uppercase tracking-wider"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> Add
        </button>
      </div>
    </Card3D>
  );
}

// Subcomponent: Zoomable Image with Hover & Touch Magnifier
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      setOrigin({ x, y });
    }
  };

  return (
    <div
      className="relative w-full h-64 bg-[#16191E] border border-slate-800 rounded-2xl p-4 overflow-hidden flex items-center justify-center cursor-zoom-in group select-none"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsZoomed(true)}
      onTouchEnd={() => setIsZoomed(false)}
      onTouchMove={handleTouchMove}
    >
      <img
        src={src}
        alt={alt}
        className="h-full object-contain transition-transform duration-150 ease-out"
        style={{
          transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
        }}
      />
      <div
        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/85 border border-slate-700/80 text-[10px] font-bold text-teal-300 flex items-center gap-1.5 backdrop-blur-md transition-all pointer-events-none shadow-md ${
          isZoomed ? 'opacity-100 ring-1 ring-teal-400/50 scale-105' : 'opacity-85 group-hover:opacity-100'
        }`}
      >
        <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
        <span>{isZoomed ? '2.5x Magnify' : 'Hover to Zoom'}</span>
      </div>
    </div>
  );
}

// Subcomponent: Detail Modal
function DetailModal({
  data,
  onClose,
  onAddToCartPhone,
  onAddToCartAccessory,
}: {
  data: {
    type: 'phone' | 'accessory';
    item: PhoneProduct | AccessoryProduct;
    activeImage: string;
    activeColor?: string;
    activeStorage?: string;
  };
  onClose: () => void;
  onAddToCartPhone: (storage: string, color: string, image: string) => void;
  onAddToCartAccessory: () => void;
}) {
  const isPhone = data.type === 'phone';
  const phone = isPhone ? (data.item as PhoneProduct) : null;
  const acc = !isPhone ? (data.item as AccessoryProduct) : null;

  const [currentImage, setCurrentImage] = useState<string>(data.activeImage);
  const [selectedColor, setSelectedColor] = useState<string>(data.activeColor || '');
  const [selectedStorage, setSelectedStorage] = useState<string>(
    data.activeStorage || (phone ? phone.storageOptions[0] : '')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0F1115] border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative space-y-5 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#16191E] text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {phone && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ZoomableImage src={currentImage} alt={phone.name} />

              {/* Color switcher */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium">Select Color Variant:</span>
                <div className="flex items-center gap-3">
                  {phone.colorVariants.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        setCurrentImage(c.image);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                        selectedColor === c.name
                          ? 'border-teal-400 bg-teal-500/10 text-teal-300'
                          : 'border-slate-800 bg-[#16191E] text-slate-400'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-extrabold uppercase">
                  {phone.brand} • {phone.condition}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{phone.name}</h2>
                <div className="text-2xl font-mono font-extrabold text-teal-400 mt-1">${phone.price} USD</div>
              </div>

              {/* Storage */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium">Storage Capacity:</span>
                <div className="flex items-center gap-2">
                  {phone.storageOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedStorage(st)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                        selectedStorage === st
                          ? 'bg-teal-500 text-black font-extrabold'
                          : 'bg-[#16191E] text-slate-400 border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Specifications:</span>
                <div className="space-y-1.5 text-slate-300">
                  <p><strong>Display:</strong> {phone.specs.display}</p>
                  <p><strong>Processor:</strong> {phone.specs.chipset}</p>
                  <p><strong>Camera:</strong> {phone.specs.camera}</p>
                  <p><strong>Battery:</strong> {phone.specs.battery}</p>
                  <p><strong>Warranty:</strong> {phone.specs.warranty}</p>
                </div>
              </div>

              <PriceDropNotifier
                productName={phone.name}
                currentPrice={phone.price}
                productId={phone.id}
              />

              <button
                onClick={() => onAddToCartPhone(selectedStorage, selectedColor, currentImage)}
                className="w-full py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Shopping Cart
              </button>
            </div>
          </div>
        )}

        {acc && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ZoomableImage src={acc.image} alt={acc.name} />

            <div className="space-y-4">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#16191E] border border-slate-800 text-[10px] text-teal-400 font-extrabold uppercase">
                  {acc.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{acc.name}</h2>
                <div className="text-2xl font-mono font-extrabold text-teal-400 mt-1">${acc.price} USD</div>
              </div>

              <p className="text-xs text-slate-300">{acc.description}</p>

              {acc.features && (
                <div className="space-y-1.5 text-xs border-t border-slate-800 pt-3">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Features:</span>
                  {acc.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-teal-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <PriceDropNotifier
                productName={acc.name}
                currentPrice={acc.price}
                productId={acc.id}
              />

              <button
                onClick={onAddToCartAccessory}
                className="w-full py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" /> Add To Shopping Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
