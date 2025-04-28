
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { CartContextType } from "@/types/cart";
import { useCartOperations } from "@/hooks/useCartOperations";
import { calculateTotalItems, calculateTotalPrice } from "@/utils/cartUtils";

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  isLoading: true,
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { 
    items, 
    isLoading, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    fetchCartItems 
  } = useCartOperations(user?.id);

  // Calculate totals using utility functions
  const totalItems = calculateTotalItems(items);
  const totalPrice = calculateTotalPrice(items);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
