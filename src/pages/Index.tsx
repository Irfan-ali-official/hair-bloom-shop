
import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentMethods from "@/components/PaymentMethods";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturedProducts />
        <Features />
        <Testimonials />
        <PaymentMethods />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
