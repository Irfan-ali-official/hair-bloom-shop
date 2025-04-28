
import { Building2, CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

type PaymentMethodSelectorProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  formData: {
    bankAccountNumber?: string;
    bankAccountName?: string;
    easyPaisaNumber?: string;
    easyPaisaName?: string;
    jazzCashNumber?: string;
    jazzCashName?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PaymentMethodSelector = ({ 
  paymentMethod, 
  setPaymentMethod, 
  formData,
  handleInputChange 
}: PaymentMethodSelectorProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4 text-lushmo-green">Payment Method</h2>
      <RadioGroup
        value={paymentMethod}
        onValueChange={setPaymentMethod}
        className="grid gap-4"
      >
        <div className="space-y-4">
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
          
          {paymentMethod === 'bank' && (
            <div className="ml-10 space-y-3 p-4 bg-lushmo-beige/10 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="bankAccountNumber">Account Number</Label>
                <Input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Enter bank account number"
                  required={paymentMethod === 'bank'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccountName">Account Name</Label>
                <Input
                  id="bankAccountName"
                  name="bankAccountName"
                  value={formData.bankAccountName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter account holder name"
                  required={paymentMethod === 'bank'}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
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
          
          {paymentMethod === 'easypaisa' && (
            <div className="ml-10 space-y-3 p-4 bg-lushmo-beige/10 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="easyPaisaNumber">Phone Number</Label>
                <Input
                  id="easyPaisaNumber"
                  name="easyPaisaNumber"
                  value={formData.easyPaisaNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Enter EasyPaisa number"
                  required={paymentMethod === 'easypaisa'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="easyPaisaName">Account Name</Label>
                <Input
                  id="easyPaisaName"
                  name="easyPaisaName"
                  value={formData.easyPaisaName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter account name"
                  required={paymentMethod === 'easypaisa'}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
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
          
          {paymentMethod === 'jazzcash' && (
            <div className="ml-10 space-y-3 p-4 bg-lushmo-beige/10 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="jazzCashNumber">Phone Number</Label>
                <Input
                  id="jazzCashNumber"
                  name="jazzCashNumber"
                  value={formData.jazzCashNumber || ''}
                  onChange={handleInputChange}
                  placeholder="Enter JazzCash number"
                  required={paymentMethod === 'jazzcash'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jazzCashName">Account Name</Label>
                <Input
                  id="jazzCashName"
                  name="jazzCashName"
                  value={formData.jazzCashName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter account name"
                  required={paymentMethod === 'jazzcash'}
                />
              </div>
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
