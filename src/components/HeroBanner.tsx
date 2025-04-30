
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative bg-lushmo-beige overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content - text and call to action */}
          <div className="max-w-lg">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lushmo-green mb-2">
                LushMo
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-lushmo-green mb-4">
                HAIR OIL
              </h2>
              <div className="h-1 w-20 bg-lushmo-gold mb-6"></div>
              <p className="text-3xl md:text-4xl font-bold text-lushmo-green">
                Nourish Naturally,<br />Shine Beautifully
              </p>
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
                className="bg-lushmo-green hover:bg-lushmo-green/90 text-white text-lg px-8 py-6 rounded-full"
              >
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-1" />
                </Link>
              </Button>
              
              <p className="text-lg text-lushmo-brown font-medium mt-3">
                Available in 20ml and 100ml
              </p>
            </div>
          </div>
          
          {/* Right content - banner image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png" 
              alt="LushMo Hair Oil" 
              className="max-h-[600px] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
