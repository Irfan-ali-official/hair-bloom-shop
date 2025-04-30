
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-lushmo-green to-lushmo-green/90 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Hair?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience the power of 8 natural ingredients in our herbal blend, designed to strengthen roots, reduce hair fall, and boost shine.
            </p>
            <Button 
              asChild 
              className="bg-white text-lushmo-green hover:bg-white/90 rounded-full px-8 py-6 text-lg"
            >
              <Link to="/products">
                <ShoppingCart className="mr-2" />
                ORDER NOW
              </Link>
            </Button>
            <p className="mt-4 text-white/80 font-medium">
              Available in 100 ml and 20 ml
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
