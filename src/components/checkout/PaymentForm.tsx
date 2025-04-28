
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentFormProps = {
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PaymentForm = ({ formData, handleInputChange }: PaymentFormProps) => {
  return (
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
  );
};

export default PaymentForm;
