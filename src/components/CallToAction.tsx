
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-lushmo-green to-lushmo-green/90 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20 shadow-xl">
          <div className="text-center">
            <div className="inline-block mb-4">
              <img 
                src="/lovable-uploads/42c2cc37-9ec6-41fb-8ffb-8934818693f6.png" 
                alt="LushMo Hair Oil" 
                className="h-16 md:h-20 mx-auto mb-6"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Hair?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who have discovered the secret to healthier, shinier, and fuller hair.
            </p>
            <Button asChild className="bg-white text-lushmo-green hover:bg-white/90 rounded-full px-8 py-6 text-lg">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
