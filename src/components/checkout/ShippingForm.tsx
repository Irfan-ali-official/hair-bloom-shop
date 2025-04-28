
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ShippingFormProps = {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ShippingForm = ({ formData, handleInputChange }: ShippingFormProps) => {
  return (
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
  );
};

export default ShippingForm;
