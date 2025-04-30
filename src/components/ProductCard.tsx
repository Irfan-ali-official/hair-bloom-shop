
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
  imageUrl: string;
  slug: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <Card className="border border-lushmo-gold/20 hover:border-lushmo-gold hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-lushmo-green/5 to-lushmo-gold/5 flex items-center justify-center p-6">
          <img 
            src={product.imageUrl}
            alt={`${product.name} ${product.size}`}
            className="h-4/5 object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-2xl text-lushmo-green">{product.name}</h3>
          <div className="text-lg text-lushmo-gold font-medium">{product.size}</div>
          <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>
          <div className="mt-4 mb-4 flex justify-between items-center">
            <span className="font-bold text-2xl text-lushmo-green">Rs. {product.price}</span>
          </div>
          <div className="flex gap-3">
            <Button 
              asChild 
              className="flex-1 bg-lushmo-green hover:bg-lushmo-green/90 text-white"
            >
              <Link to={`/products/${product.slug}`}>View Details</Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="border-lushmo-green text-lushmo-green hover:bg-lushmo-green/10"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
