
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-lushmo-beige to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-lushmo-green mb-4">Our Premium Hair Oils</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect size for your hair care journey. All products feature our signature blend of natural oils and herbs.
          </p>
        </div>
        
        <Card className="overflow-hidden bg-white rounded-2xl shadow-xl border-0 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-lushmo-green/10 to-lushmo-gold/10 p-8 md:p-12 flex items-center justify-center">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-lushmo-gold/20 filter blur-lg"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-lushmo-green/20 filter blur-lg"></div>
                <img 
                  src="/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png" 
                  alt="LushMo Hair Oil" 
                  className="w-full max-w-xs mx-auto z-10 relative drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-4 inline-block">
                <div className="text-sm text-lushmo-gold font-semibold tracking-wider uppercase mb-1">Premium Quality</div>
                <h3 className="text-3xl md:text-4xl font-bold text-lushmo-green">LushMo Hair Oil</h3>
                <div className="h-1 w-20 bg-lushmo-gold mt-2"></div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Our signature blend of <span className="font-medium">Amla, Reetha, Shikakai, Ratanjot,</span> and 
                <span className="font-medium"> Kalonji</span> herbs, designed to strengthen roots, reduce hair fall, and boost shine.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-lushmo-gold/20 rounded-lg p-4 transition-all hover:border-lushmo-gold hover:shadow-md">
                  <div className="text-xl font-bold text-lushmo-green">20ml</div>
                  <div className="text-lushmo-gold font-medium">Rs. 499</div>
                  <div className="text-sm text-gray-500">Travel-size bottle</div>
                </div>
                <div className="border border-lushmo-gold/20 rounded-lg p-4 transition-all hover:border-lushmo-gold hover:shadow-md">
                  <div className="text-xl font-bold text-lushmo-green">100ml</div>
                  <div className="text-lushmo-gold font-medium">Rs. 1999</div>
                  <div className="text-sm text-gray-500">Regular-use bottle</div>
                </div>
              </div>
              
              <Button asChild className="self-start bg-lushmo-green hover:bg-lushmo-green/90 text-white rounded-full">
                <Link to="/products">View Collection <ArrowRight className="ml-1" /></Link>
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-8">
          <Card className="border border-lushmo-gold/20 hover:border-lushmo-gold hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6">
              <div className="aspect-square overflow-hidden mb-6 bg-gradient-to-br from-lushmo-green/5 to-lushmo-gold/5 rounded-md flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png" 
                  alt="LushMo Hair Oil 20ml" 
                  className="h-3/4 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lushmo-green">LushMo Hair Oil</h3>
                <p className="text-lushmo-gold font-medium">20ml • Rs. 499</p>
                <p className="my-3 text-gray-600">Travel-size bottle perfect for first-time users. Our signature blend of natural herbs.</p>
                <Button asChild className="w-full mt-2 bg-lushmo-green hover:bg-lushmo-green/90 text-white">
                  <Link to="/products/lushmo-hair-oil-20ml">View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-lushmo-gold/20 hover:border-lushmo-gold hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6">
              <div className="aspect-square overflow-hidden mb-6 bg-gradient-to-br from-lushmo-green/5 to-lushmo-gold/5 rounded-md flex items-center justify-center">
                <img 
                  src="/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png" 
                  alt="LushMo Hair Oil 100ml" 
                  className="h-3/4 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-lushmo-green">LushMo Hair Oil</h3>
                <p className="text-lushmo-gold font-medium">100ml • Rs. 1999</p>
                <p className="my-3 text-gray-600">Our full-size bottle for regular use. Experience the full power of our natural herbal blend.</p>
                <Button asChild className="w-full mt-2 bg-lushmo-green hover:bg-lushmo-green/90 text-white">
                  <Link to="/products/lushmo-hair-oil-100ml">View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
