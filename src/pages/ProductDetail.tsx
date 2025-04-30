
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const products: Product[] = [
  {
    id: '1',
    name: 'LushMo Hair Oil',
    size: '20ml',
    price: 499,
    description: 'Travel-size bottle perfect for first-time users. Our signature blend of 8 natural herbs including Amla, Reetha, Shikakai, Ratanjot, and Kalonji.',
    imageUrl: '/lovable-uploads/a7fbfc04-728c-4ecd-a564-7509ccbbb4c2.png',
    slug: 'lushmo-hair-oil-20ml'
  },
  {
    id: '2',
    name: 'LushMo Hair Oil',
    size: '100ml',
    price: 1999,
    description: 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend for stronger, shinier hair.',
    imageUrl: '/lovable-uploads/a7fbfc04-728c-4ecd-a564-7509ccbbb4c2.png',
    slug: 'lushmo-hair-oil-100ml'
  }
];

const benefits = [
  "Reduces hair fall and promotes new growth",
  "Strengthens hair roots and prevents breakage",
  "Adds natural shine without greasiness",
  "Nourishes scalp and treats dandruff",
  "Made with 100% natural ingredients",
  "No harmful chemicals or additives"
];

const ingredients = [
  "Amla (Indian Gooseberry)",
  "Reetha (Soap Nut)",
  "Shikakai",
  "Ratanjot (Alkanet)",
  "Kalonji (Black Seed)",
  "Coconut Oil",
  "Sesame Oil",
  "Brahmi"
];

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-lushmo-beige">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-lushmo-green mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the product you're looking for.
            </p>
            <Button asChild className="bg-lushmo-green hover:bg-lushmo-green/90 text-white">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} ${product.size} × ${quantity} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-lushmo-beige/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/products" className="text-lushmo-green hover:underline flex items-center gap-2">
              ← Back to Products
            </Link>
          </div>
          
          {/* Product Overview */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 flex items-center justify-center bg-gradient-to-br from-lushmo-beige to-white">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-h-[400px] object-contain"
                />
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl font-bold text-lushmo-green">{product.name}</h1>
                <div className="inline-block bg-lushmo-gold/20 text-lushmo-brown px-3 py-1 rounded-full text-sm font-medium mt-2">
                  {product.size}
                </div>
                <div className="text-3xl font-semibold text-lushmo-green mt-3">Rs. {product.price}</div>
                
                <div className="mt-6">
                  <p className="text-lushmo-brown/80 text-lg">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-lushmo-brown mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-lushmo-green text-lushmo-green" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      -
                    </Button>
                    <span className="mx-6 w-8 text-center text-xl font-medium">{quantity}</span>
                    <Button 
                      variant="outline"
                      size="icon"
                      className="border-lushmo-green text-lushmo-green"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    className="w-full bg-lushmo-green hover:bg-lushmo-green/90 text-white text-lg py-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <Card className="border-lushmo-gold/30 overflow-hidden mb-8">
                <div className="bg-lushmo-green text-white px-6 py-4">
                  <h2 className="text-2xl font-bold">Key Benefits</h2>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 text-lushmo-gold">
                          <Check size={16} />
                        </span>
                        <span className="text-lushmo-brown">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column */}
            <div>
              <Card className="border-lushmo-gold/30 overflow-hidden mb-8">
                <div className="bg-lushmo-green text-white px-6 py-4">
                  <h2 className="text-2xl font-bold">Natural Ingredients</h2>
                </div>
                <CardContent className="pt-6">
                  <ul className="grid grid-cols-2 gap-y-3">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1 text-lushmo-gold">
                          <Check size={16} />
                        </span>
                        <span className="text-lushmo-brown">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* How to Use */}
          <Card className="border-lushmo-gold/30 overflow-hidden">
            <div className="bg-lushmo-green text-white px-6 py-4">
              <h2 className="text-2xl font-bold">How to Use</h2>
            </div>
            <CardContent className="pt-6">
              <ol className="list-decimal list-inside space-y-3 text-lushmo-brown pl-2">
                <li>Apply a small amount (2-3 drops for 20ml, 5-6 drops for 100ml) to your palm</li>
                <li>Gently massage the oil into your scalp and work through to the ends of your hair</li>
                <li>For best results, leave in for at least 30 minutes before washing</li>
                <li>For deep conditioning, apply before bed and leave overnight</li>
                <li>Use 2-3 times per week for optimal results</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
