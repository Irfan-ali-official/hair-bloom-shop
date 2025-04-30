
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import PaymentMethods from "@/components/PaymentMethods";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
};

const products: Product[] = [
  {
    id: '1',
    name: 'LushMo Hair Oil',
    size: '20ml',
    price: 499,
    description: 'Travel-size bottle perfect for first-time users. Our signature blend of Amla, Reetha, Shikakai, Ratanjot, and Kalonji herbs.',
    imageUrl: '/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png',
    slug: 'lushmo-hair-oil-20ml'
  },
  {
    id: '2',
    name: 'LushMo Hair Oil',
    size: '100ml',
    price: 1999,
    description: 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend for stronger, shinier hair.',
    imageUrl: '/lovable-uploads/7062c11d-ae54-4ffd-9e61-22d3fa49e151.png',
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
        <div className="bg-lushmo-beige py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-lushmo-green mb-3">Our Products</h1>
            <p className="text-lushmo-brown/80 text-lg md:text-xl max-w-3xl">
              Choose your perfect size of LushMo Hair Oil for natural nourishment and beautiful shine
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="border border-lushmo-gold/20 hover:border-lushmo-gold hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-lushmo-green/5 to-lushmo-gold/5 flex items-center justify-center p-6">
                    <img 
                      src={product.imageUrl} 
                      alt={`${product.name} ${product.size}`} 
                      className="h-4/5 object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-lushmo-green">{product.name}</h3>
                    <div className="text-lg text-lushmo-gold font-medium">{product.size}</div>
                    <p className="my-3 text-gray-600 line-clamp-2">{product.description}</p>
                    <div className="font-bold text-2xl text-lushmo-green mb-4">Rs. {product.price}</div>
                    <Button 
                      asChild 
                      className="w-full bg-lushmo-green hover:bg-lushmo-green/90 text-white"
                    >
                      <Link to={`/products/${product.slug}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
