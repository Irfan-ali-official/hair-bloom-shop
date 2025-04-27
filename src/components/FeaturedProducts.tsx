
import ProductCard, { Product } from './ProductCard';

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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown mb-4">Our Premium Hair Oils</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect size for your hair care journey. All products feature our signature blend of natural oils and extracts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
