
import { Building2, CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PaymentMethodSelectorProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Payment Method</h2>
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
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
  );
};

export default PaymentMethodSelector;
