import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import OrderSummary from "@/components/checkout/OrderSummary";

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, isLoading: isCartLoading } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/auth");
    } else if (!isCartLoading && items.length === 0) {
      navigate("/products");
    }
  }, [user, items, isAuthLoading, isCartLoading, navigate]);

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
      await supabase.from('profiles').upsert({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
      });
      
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
      
      await clearCart();
      
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
                <ShippingForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />
                
                <PaymentForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                />

                <PaymentMethodSelector 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={(value) => setPaymentMethod(value as PaymentMethod)}
                />
                
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
              <OrderSummary items={items} totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
