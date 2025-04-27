
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative bg-beige overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582562124811-c09040d0a901')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warm-brown mb-4">
            Nourish Your Hair, <br /> Naturally
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Premium hair oil made from organic ingredients, promoting growth and adding luscious shine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-warm-brown hover:bg-warm-brown/90 text-white rounded-full px-8">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown/10 rounded-full px-8">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
