
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
