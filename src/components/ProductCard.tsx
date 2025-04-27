
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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
    <div className="group rounded-lg overflow-hidden bg-white border border-border transition-all duration-300 hover:shadow-md">
      <div className="relative overflow-hidden h-64">
        <img 
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <div className="text-sm text-muted-foreground">{product.size}</div>
        <div className="mt-2 mb-4 flex justify-between items-center">
          <span className="font-medium text-warm-brown">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-warm-brown hover:bg-warm-brown/90 text-white">
            <Link to={`/products/${product.slug}`}>View Details</Link>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-warm-brown text-warm-brown hover:bg-warm-brown/10"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
