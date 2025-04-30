
import ProductCard, { Product } from './ProductCard';

const products: Product[] = [
  {
    id: '1',
    name: 'LushMo Hair Oil',
    size: '20ml',
    price: 499,
    description: 'Travel-size bottle perfect for first-time users. Our signature blend of natural herbs.',
    imageUrl: '/lovable-uploads/1408ccff-d081-44dc-a96d-456428ad3d0b.png',
    slug: 'lushmo-hair-oil-20ml'
  },
  {
    id: '2',
    name: 'LushMo Hair Oil',
    size: '100ml',
    price: 1999,
    description: 'Our full-size bottle for regular use. Experience the full power of our natural herbal blend.',
    imageUrl: '/lovable-uploads/1408ccff-d081-44dc-a96d-456428ad3d0b.png',
    slug: 'lushmo-hair-oil-100ml'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-lushmo-green mb-4">Our Premium Hair Oils</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect size for your hair care journey. All products feature our signature blend of natural oils and extracts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
