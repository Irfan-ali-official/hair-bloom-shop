
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative bg-lushmo-beige overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/2a86855a-e923-4d05-8923-d398ad5728f0.png')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/42c2cc37-9ec6-41fb-8ffb-8934818693f6.png" 
              alt="LushMo Hair Oil" 
              className="h-20 md:h-24"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lushmo-green mb-4">
            Nourish Naturally, <br /> Shine Beautifully
          </h1>
          <p className="text-lg md:text-xl mb-6 text-lushmo-brown/80">
            Experience the power of 8 natural ingredients in our herbal blend, 
            designed to strengthen roots, reduce hair fall, and boost shine.
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
            <Button 
              asChild 
              className="bg-lushmo-green hover:bg-lushmo-green/90 text-white text-lg px-8 py-6 rounded-full"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="border-lushmo-green text-lushmo-green hover:bg-lushmo-green/10 text-lg px-8 py-6 rounded-full"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
