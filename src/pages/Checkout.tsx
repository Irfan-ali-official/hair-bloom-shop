import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Building2, CreditCard, Wallet } from "lucide-react";

type PaymentMethod = 'bank' | 'easypaisa' | 'jazzcash';

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
  const [formData, setFormData<CheckoutFormData>>({
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
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
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
          payment_method: paymentMethod,
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          status: 'pending'
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
      
      // Clear cart after successful order
      await clearCart();
      
      // Show success message with payment instructions
      let paymentInstructions = "";
      switch(paymentMethod) {
        case 'bank':
          paymentInstructions = "Please transfer the amount to our bank account. Details will be sent to your email.";
          break;
        case 'easypaisa':
          paymentInstructions = "Please complete the payment using EasyPaisa. Account details will be sent to your email.";
          break;
        case 'jazzcash':
          paymentInstructions = "Please complete the payment using JazzCash. Account details will be sent to your email.";
          break;
      }
      
      toast({
        title: "Order placed successfully!",
        description: paymentInstructions,
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
        <main className="flex-grow flex items-center justify-center bg-lushmo-beige">
          <div className="text-center">
            <p className="text-lushmo-brown">Loading checkout...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-lushmo-beige">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-lushmo-green mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Shipping Information</h2>
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
                
                <div className="bg-white p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Payment Information</h2>
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

                <div className="bg-white p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Payment Method</h2>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="grid gap-4"
                  >
                    <div className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-lushmo-beige/10">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                        <Building2 className="h-5 w-5 text-lushmo-gold" />
                        <div>
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-sm text-muted-foreground">Pay directly to our bank account</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-lushmo-beige/10">
                      <RadioGroupItem value="easypaisa" id="easypaisa" />
                      <Label htmlFor="easypaisa" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 text-lushmo-gold" />
                        <div>
                          <div className="font-medium">EasyPaisa</div>
                          <div className="text-sm text-muted-foreground">Pay using EasyPaisa mobile wallet</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-lushmo-beige/10">
                      <RadioGroupItem value="jazzcash" id="jazzcash" />
                      <Label htmlFor="jazzcash" className="flex items-center gap-2 cursor-pointer">
                        <Wallet className="h-5 w-5 text-lushmo-gold" />
                        <div>
                          <div className="font-medium">JazzCash</div>
                          <div className="text-sm text-muted-foreground">Pay using JazzCash mobile wallet</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-lushmo-green hover:bg-lushmo-green/90"
                  disabled={processingOrder}
                >
                  {processingOrder ? "Processing Order..." : `Pay Rs. ${totalPrice.toFixed(2)}`}
                </Button>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg border border-border sticky top-4">
                <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Order Summary</h2>
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
                        Rs. {(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-border">
                    <span>Total</span>
                    <span>Rs. {totalPrice.toFixed(2)}</span>
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
