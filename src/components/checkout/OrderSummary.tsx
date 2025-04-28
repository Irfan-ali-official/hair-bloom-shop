
import { CartItem } from "@/types/cart";

type OrderSummaryProps = {
  items: CartItem[];
  totalPrice: number;
};

const OrderSummary = ({ items, totalPrice }: OrderSummaryProps) => {
  return (
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
  );
};

export default OrderSummary;
