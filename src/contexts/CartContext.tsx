
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

type CartItem = {
  id?: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;
};

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Fetch cart items from Supabase when user changes
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setItems([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user?.id);
        
      if (error) throw error;
      
      // For each cart item, find the corresponding product in our products array
      // In a real app, you would fetch products from a database
      if (data) {
        const productsWithData = data.map((item) => {
          // Find product by ID from our products array
          // In the actual implementation you would query products table
          // This is a placeholder using the static products data
          const productId = item.product_id;
          const productParts = productId.split('-');
          const productName = productParts[0] === 'hairbloom' ? 'HairBloom' : '';
          const productType = productParts[1] === 'growth' ? 'Growth Oil' : 'Shine Oil';
          const productSize = productParts[productParts.length - 1];
          
          const product: Product = {
            id: item.product_id,
            name: `${productName} ${productType}`,
            size: productSize,
            price: productSize === '150ml' ? 19.99 : 
                   productSize === '250ml' ? 29.99 : 49.99,
            description: `Our ${productSize} size, perfect for regular use.`,
            imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
            slug: item.product_id
          };
          
          return {
            id: item.id,
            product,
            quantity: item.quantity
          };
        });
        
        setItems(productsWithData);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching cart",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (product: Product, quantity = 1) => {
    try {
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to sign in to add items to your cart",
          variant: "destructive",
        });
        return;
      }
      
      // Check if the item is already in the cart
      const existingItem = items.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity
        await updateQuantity(product.id, existingItem.quantity + quantity);
      } else {
        // Add new item to Supabase
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        });
        
        if (error) throw error;
        
        // Refresh cart
        await fetchCartItems();
        
        toast({
          title: "Added to cart",
          description: `${product.name} ${product.size} added to your cart`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error adding item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeItem = async (productId: string) => {
    try {
      if (!user) return;
      
      // Find the cart item to delete
      const itemToRemove = items.find((item) => item.product.id === productId);
      if (!itemToRemove || !itemToRemove.id) return;
      
      // Delete from Supabase
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemToRemove.id);
        
      if (error) throw error;
      
      // Refresh cart
      await fetchCartItems();
      
      toast({
        title: "Removed from cart",
        description: `Item removed from your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error removing item",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (!user) return;
      
      // Ensure quantity is at least 1
      const newQuantity = Math.max(1, quantity);
      
      // Find the cart item to update
      const itemToUpdate = items.find((item) => item.product.id === productId);
      if (!itemToUpdate || !itemToUpdate.id) return;
      
      // Update in Supabase
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemToUpdate.id);
        
      if (error) throw error;
      
      // Refresh cart
      await fetchCartItems();
    } catch (error: any) {
      toast({
        title: "Error updating quantity",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      if (!user) return;
      
      // Delete all cart items for this user
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);
        
      if (error) throw error;
      
      // Refresh cart
      setItems([]);
      
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error: any) {
      toast({
        title: "Error clearing cart",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
