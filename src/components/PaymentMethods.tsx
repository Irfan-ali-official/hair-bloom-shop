
import { Building2, CreditCard, Wallet } from "lucide-react";

const PaymentMethods = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-lushmo-green mb-8">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 border border-lushmo-gold/20 rounded-lg bg-gradient-to-b from-white to-lushmo-beige/20">
            <Building2 className="w-12 h-12 text-lushmo-gold mb-4" />
            <h3 className="text-xl font-semibold text-lushmo-green mb-2">Bank Transfer</h3>
            <p className="text-center text-gray-600">
              Transfer directly to our bank account for secure payment processing
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 border border-lushmo-gold/20 rounded-lg bg-gradient-to-b from-white to-lushmo-beige/20">
            <CreditCard className="w-12 h-12 text-lushmo-gold mb-4" />
            <h3 className="text-xl font-semibold text-lushmo-green mb-2">EasyPaisa</h3>
            <p className="text-center text-gray-600">
              Quick and easy payments through EasyPaisa mobile wallet
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 border border-lushmo-gold/20 rounded-lg bg-gradient-to-b from-white to-lushmo-beige/20">
            <Wallet className="w-12 h-12 text-lushmo-gold mb-4" />
            <h3 className="text-xl font-semibold text-lushmo-green mb-2">JazzCash</h3>
            <p className="text-center text-gray-600">
              Secure payments via JazzCash mobile wallet service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
