
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-warm-brown text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Hair?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of satisfied customers who have discovered the secret to healthier, shinier, and fuller hair.
        </p>
        <Button asChild className="bg-white text-warm-brown hover:bg-white/90 rounded-full px-8 py-6 text-lg">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
