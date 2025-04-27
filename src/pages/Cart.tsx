
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!user && !isLoading) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-beige">
          <div className="text-center">
            <p className="text-warm-brown">Loading your cart...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-beige py-16">
          <div className="text-center max-w-md px-4">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold text-warm-brown mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-warm-brown hover:bg-warm-brown/90">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-warm-brown mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center border-b border-border py-6">
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow ml-0 sm:ml-4">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.size}</p>
                    <div className="font-medium text-warm-brown mt-1">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 ml-4 text-destructive hover:text-destructive/90"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border my-2 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-warm-brown hover:bg-warm-brown/90"
                  asChild
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
