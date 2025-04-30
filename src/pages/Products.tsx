
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import PaymentMethods from "@/components/PaymentMethods";

const products: Product[] = [
  {
    id: '1',
    name: 'LushMo Hair Oil',
    size: '20ml',
    price: 499,
    description: 'Travel-size bottle perfect for first-time users. Our signature blend of Amla, Reetha, Shikakai, Ratanjot, and Kalonji herbs.',
    imageUrl: '/lovable-uploads/88c1657c-799b-400b-825d-4e82a999024a.png',
    slug: 'lushmo-hair-oil-20ml'
  },
  {
    id: '2',
    name: 'LushMo Hair Oil',
    size: '100ml',
    price: 1999,
    description: 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend for stronger, shinier hair.',
    imageUrl: '/lovable-uploads/88c1657c-799b-400b-825d-4e82a999024a.png',
    slug: 'lushmo-hair-oil-100ml'
  }
];

type FilterType = 'all' | '20ml' | '100ml';

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '20ml' && product.size === '20ml') return true;
    if (activeFilter === '100ml' && product.size === '100ml') return true;
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-lushmo-beige py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-lushmo-green mb-2">Our Products</h1>
            <p className="text-lushmo-brown/80">
              Choose your perfect size of LushMo Hair Oil for natural nourishment and beautiful shine
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {['all', '20ml', '100ml'].map((filter) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className={
                  activeFilter === filter 
                    ? 'bg-lushmo-green hover:bg-lushmo-green/90' 
                    : 'border-lushmo-green text-lushmo-green hover:bg-lushmo-green/10'
                }
                onClick={() => setActiveFilter(filter as FilterType)}
              >
                {filter === 'all' ? 'All Sizes' : filter}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
        
        <PaymentMethods />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
