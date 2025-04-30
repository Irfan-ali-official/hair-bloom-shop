
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ProductCard, { Product } from './ProductCard';

const products: Product[] = [
  {
    id: '1',
    name: 'LushMo Hair Oil',
    size: '20ml',
    price: 499,
    description: 'Travel-size bottle perfect for first-time users. Our signature blend of Amla, Reetha, Shikakai, Ratanjot, and Kalonji herbs.',
    imageUrl: '/lovable-uploads/2a86855a-e923-4d05-8923-d398ad5728f0.png',
    slug: 'lushmo-hair-oil-20ml'
  },
  {
    id: '2',
    name: 'LushMo Hair Oil',
    size: '100ml',
    price: 1999,
    description: 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend for stronger, shinier hair.',
    imageUrl: '/lovable-uploads/2a86855a-e923-4d05-8923-d398ad5728f0.png',
    slug: 'lushmo-hair-oil-100ml'
  }
];

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
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-lushmo-green/10 to-lushmo-gold/10 p-8 md:p-12 flex items-center justify-center">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-lushmo-gold/20 filter blur-lg"></div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-lushmo-green/20 filter blur-lg"></div>
                <img 
                  src="/lovable-uploads/2a86855a-e923-4d05-8923-d398ad5728f0.png" 
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-lushmo-green hover:bg-lushmo-green/90 text-white rounded-full">
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" className="border-lushmo-green text-lushmo-green hover:bg-lushmo-green/10 rounded-full">
                  <Link to="/products">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
