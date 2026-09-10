// src/hooks/useCart.ts
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/constants/menu';

interface CartContextType {
  quantities: Record<string, number>;
  setQuantity: (product: Product, qty: number) => void;
  increment: (product: Product) => void;
  decrement: (product: Product) => void;
  cartItemsCount: number;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const setQuantity = (product: Product, qty: number) => {
    setQuantities((prev) => ({ ...prev, [product.id]: Math.max(0, qty) }));
  };

  const increment = (product: Product) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const decrement = (product: Product) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: Math.max(0, (prev[product.id] || 0) - 1),
    }));
  };

  const cartItemsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  return React.createElement(
    CartContext.Provider,
    {
      value: {
        quantities,
        setQuantity,
        increment,
        decrement,
        cartItemsCount,
        selectedProduct,
        setSelectedProduct,
      },
    },
    children
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return ctx;
}
