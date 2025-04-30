
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative bg-lushmo-beige overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content - text and call to action */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lushmo-green mb-2">
                LushMo
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-lushmo-green mb-4">
                HAIR OIL
              </h2>
              <div className="h-1 w-20 bg-lushmo-gold mb-6"></div>
              <h3 className="text-3xl md:text-4xl font-bold text-lushmo-green">
                Nourish Naturally,<br />Shine Beautifully
              </h3>
            </div>
            
            <div className="bg-lushmo-green text-white p-5 rounded-md mb-8 max-w-md">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lushmo-gold inline-block"></span>
                  <span>Herbal Blend of 8 Natural Ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lushmo-gold inline-block"></span>
                  <span>Strengthens Roots</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lushmo-gold inline-block"></span>
                  <span>Reduces Hair Fall • Boosts Shine</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <Button 
                asChild 
                className="bg-lushmo-green hover:bg-lushmo-green/90 text-white text-lg px-8 py-6 rounded-full w-full sm:w-auto"
              >
                <Link to="/products">
                  <ShoppingCart className="mr-2" />
                  ORDER NOW
                </Link>
              </Button>
              
              <p className="text-lg text-lushmo-brown font-medium">
                Available in 100 ml and 20 ml
              </p>
            </div>
          </div>
          
          {/* Right content - banner image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="/lovable-uploads/4641bd05-10e5-47b4-b05d-7d2252ff7dd0.png" 
              alt="LushMo Hair Oil" 
              className="max-h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
