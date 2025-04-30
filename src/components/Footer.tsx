
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-beige py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <h2 className="text-lushmo-green font-semibold text-xl">LushMo Hair Oil</h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Premium hair oils crafted with natural ingredients to promote healthy hair growth and shine.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lushmo-green">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-muted-foreground hover:text-lushmo-green transition-colors">All Products</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-lushmo-green transition-colors">20ml Oil</Link></li>
              <li><Link to="/products" className="text-muted-foreground hover:text-lushmo-green transition-colors">100ml Oil</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lushmo-green">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-lushmo-green transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-lushmo-green transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-lushmo-green transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lushmo-green">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-lushmo-green transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-lushmo-green transition-colors">Returns Policy</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-lushmo-green transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-lushmo-green transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-beige-dark mt-8 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} LushMo Hair Oil. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p>Made with love for beautiful hair</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
