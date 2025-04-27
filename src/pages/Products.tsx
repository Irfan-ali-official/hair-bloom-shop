
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const products: Product[] = [
  {
    id: '1',
    name: 'HairBloom Growth Oil',
    size: '150ml',
    price: 19.99,
    description: 'Our smallest size, perfect for travel or first-time users. Enriched with biotin and castor oil to promote hair growth.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-growth-oil-150ml'
  },
  {
    id: '2',
    name: 'HairBloom Growth Oil',
    size: '250ml',
    price: 29.99,
    description: 'Our most popular size, ideal for regular use. Enriched with biotin and castor oil to promote hair growth.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-growth-oil-250ml'
  },
  {
    id: '3',
    name: 'HairBloom Growth Oil',
    size: '500ml',
    price: 49.99,
    description: 'Our largest size, great value for dedicated users. Enriched with biotin and castor oil to promote hair growth.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-growth-oil-500ml'
  },
  {
    id: '4',
    name: 'HairBloom Shine Oil',
    size: '150ml',
    price: 21.99,
    description: 'Our shine-focused formula in travel size. Infused with argan oil and vitamin E for incredible shine.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-shine-oil-150ml'
  },
  {
    id: '5',
    name: 'HairBloom Shine Oil',
    size: '250ml',
    price: 32.99,
    description: 'Our medium-sized shine-focused formula. Infused with argan oil and vitamin E for incredible shine.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-shine-oil-250ml'
  },
  {
    id: '6',
    name: 'HairBloom Shine Oil',
    size: '500ml',
    price: 54.99,
    description: 'Our largest shine-focused formula. Infused with argan oil and vitamin E for incredible shine.',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    slug: 'hairbloom-shine-oil-500ml'
  }
];

type FilterType = 'all' | '150ml' | '250ml' | '500ml' | 'growth' | 'shine';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '150ml' && product.size === '150ml') return true;
    if (activeFilter === '250ml' && product.size === '250ml') return true;
    if (activeFilter === '500ml' && product.size === '500ml') return true;
    if (activeFilter === 'growth' && product.name.toLowerCase().includes('growth')) return true;
    if (activeFilter === 'shine' && product.name.toLowerCase().includes('shine')) return true;
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-beige py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-warm-brown mb-2">Our Products</h1>
            <p className="text-muted-foreground">Find the perfect HairBloom oil for your hair care needs</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className={activeFilter === 'all' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('all')}
            >
              All Products
            </Button>
            <Button 
              variant={activeFilter === 'growth' ? 'default' : 'outline'}
              className={activeFilter === 'growth' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('growth')}
            >
              Growth Formula
            </Button>
            <Button 
              variant={activeFilter === 'shine' ? 'default' : 'outline'}
              className={activeFilter === 'shine' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('shine')}
            >
              Shine Formula
            </Button>
            <Button 
              variant={activeFilter === '150ml' ? 'default' : 'outline'}
              className={activeFilter === '150ml' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('150ml')}
            >
              150ml
            </Button>
            <Button 
              variant={activeFilter === '250ml' ? 'default' : 'outline'}
              className={activeFilter === '250ml' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('250ml')}
            >
              250ml
            </Button>
            <Button 
              variant={activeFilter === '500ml' ? 'default' : 'outline'}
              className={activeFilter === '500ml' ? 'bg-warm-brown hover:bg-warm-brown/90' : 'border-warm-brown text-warm-brown hover:bg-warm-brown/10'}
              onClick={() => setActiveFilter('500ml')}
            >
              500ml
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your filter.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
