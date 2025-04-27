
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type CheckoutFormData = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

const Checkout = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, isLoading: isCartLoading } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const [processingOrder, setProcessingOrder] = useState(false);

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/auth");
    } else if (!isCartLoading && items.length === 0) {
      navigate("/products");
    }
  }, [user, items, isAuthLoading, isCartLoading, navigate]);

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            address: data.address || '',
            city: data.city || '',
            postalCode: data.postal_code || '',
            country: data.country || '',
          }));
        }
      } catch (error: any) {
        console.error("Error loading profile:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission (dummy payment process)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete checkout",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some products before checkout.",
        variant: "destructive",
      });
      navigate("/products");
      return;
    }
    
    // Check if all required fields are filled
    const requiredFields: (keyof CheckoutFormData)[] = [
      'firstName', 'lastName', 'address', 'city', 'postalCode', 
      'country', 'cardNumber', 'cardExpiry', 'cardCvc'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simple validation for card fields
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number",
        variant: "destructive",
      });
      return;
    }
    
    setProcessingOrder(true);
    
    try {
      // First update user profile
      await supabase.from('profiles').upsert({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
      });
      
      // Create order in database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalPrice,
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // Add order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart after successful order
      await clearCart();
      
      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error processing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading || isAuthLoading || isCartLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-beige">
          <div className="text-center">
            <p className="text-warm-brown">Loading checkout...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-beige">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-warm-brown mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-border">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="address">Street Address</Label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input 
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input 
                          id="cardCvc"
                          name="cardCvc"
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          required
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-warm-brown hover:bg-warm-brown/90 mt-8"
                  disabled={processingOrder}
                >
                  {processingOrder ? "Processing Order..." : `Pay $${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <div key={item.product.id} className="py-3 flex justify-between">
                      <div>
                        <div className="font-medium">{item.product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.product.size} x {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
