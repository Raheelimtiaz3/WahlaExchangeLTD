'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileTechSection } from '@/components/MobileTechSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartItem, Product, ActivePageTab } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      subtitle: product.brand,
      price: product.price,
      type: 'phone',
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

  const handleTabChange = (tab: ActivePageTab) => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FA] text-[#172033] font-sans antialiased">
      <Navbar
        activeTab="mobile-tech"
        onTabChange={handleTabChange}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRemittanceModal={() => router.push('/')}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <MobileTechSection
          onAddToCart={handleAddToCart}
          onOpenProductDetail={(product) => setSelectedProduct(product)}
        />
      </main>

      <Footer onTabChange={handleTabChange} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
