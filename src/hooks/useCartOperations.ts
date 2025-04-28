import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/types/cart";
import { Product } from "@/components/ProductCard";

export const useCartOperations = (userId: string | undefined) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      
      if (!userId) {
        setItems([]);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId);
        
      if (error) throw error;
      
      if (data) {
        const productsWithData = data.map((item) => {
          const product: Product = {
            id: item.product_id,
            name: 'LushMo Hair Oil',
            size: item.product_id.includes('20ml') ? '20ml' : '100ml',
            price: item.product_id.includes('20ml') ? 499 : 1999,
            description: item.product_id.includes('20ml') 
              ? 'Travel-size bottle perfect for first-time users. Our signature blend of natural herbs.'
              : 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend.',
            imageUrl: '/lovable-uploads/1408ccff-d081-44dc-a96d-456428ad3d0b.png',
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
      if (!userId) {
        toast({
          title: "Please sign in",
          description: "You need to sign in to add items to your cart",
          variant: "destructive",
        });
        return;
      }
      
      const existingItem = items.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + quantity);
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: userId,
          product_id: product.id,
          quantity,
        });
        
        if (error) throw error;
        
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
      if (!userId) return;
      
      const itemToRemove = items.find((item) => item.product.id === productId);
      if (!itemToRemove?.id) return;
      
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemToRemove.id);
        
      if (error) throw error;
      
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
      if (!userId) return;
      
      const newQuantity = Math.max(1, quantity);
      const itemToUpdate = items.find((item) => item.product.id === productId);
      
      if (!itemToUpdate?.id) return;
      
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemToUpdate.id);
        
      if (error) throw error;
      
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
      if (!userId) return;
      
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);
        
      if (error) throw error;
      
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

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    fetchCartItems
  };
};
