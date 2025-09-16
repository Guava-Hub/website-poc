"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

import type { CartItem, Product } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; variantId?: string; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, variantId, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.variantId === variantId
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item === existingItem
              ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `${product.id}-${variantId || "base"}`,
            product,
            variantId,
            quantity
          }
        ]
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, 10)) }
            : item
        )
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addItem: (product: Product, variantId?: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  formattedSubtotal: string;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const subtotal = state.items.reduce((acc, item) => {
      const price = item.product.salePrice ?? item.product.price;
      return acc + price * item.quantity;
    }, 0);

    return {
      ...state,
      subtotal,
      formattedSubtotal: formatCurrency(subtotal),
      totalItems: state.items.reduce((acc, item) => acc + item.quantity, 0),
      addItem: (product: Product, variantId?: string, quantity?: number) =>
        dispatch({ type: "ADD_ITEM", payload: { product, variantId, quantity } }),
      removeItem: (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      updateQuantity: (id: string, quantity: number) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" })
    } satisfies CartContextValue;
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
