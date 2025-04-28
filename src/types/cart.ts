
import { Product } from "@/components/ProductCard";

export type CartItem = {
  id?: string;
  product: Product;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
};
