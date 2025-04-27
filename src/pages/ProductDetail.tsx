
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/components/ProductCard";

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

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-beige">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-warm-brown mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the product you're looking for.
            </p>
            <Button asChild className="bg-warm-brown hover:bg-warm-brown/90 text-white">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <Link to="/products" className="text-warm-brown hover:underline">
              ← Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="rounded-lg overflow-hidden border border-border">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-warm-brown">{product.name}</h1>
              <div className="text-lg font-medium">{product.size}</div>
              <div className="text-2xl font-semibold text-warm-brown mt-2">${product.price.toFixed(2)}</div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Key Benefits</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Promotes stronger, thicker hair</li>
                    <li>Reduces hair breakage and split ends</li>
                    <li>Adds natural shine without greasiness</li>
                    <li>Made with 100% natural ingredients</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      className="border-warm-brown text-warm-brown" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-4 w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      className="border-warm-brown text-warm-brown"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="w-full bg-warm-brown hover:bg-warm-brown/90 text-white text-lg py-6">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">How to Use</h3>
                  <ol className="list-decimal list-inside text-muted-foreground">
                    <li>Apply a small amount to dry or damp hair</li>
                    <li>Focus on the scalp and hair ends</li>
                    <li>Massage gently for 2-3 minutes</li>
                    <li>Leave in for at least 30 minutes before washing (or overnight for deeper conditioning)</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
