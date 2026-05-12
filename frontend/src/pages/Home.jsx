import Hero from '../components/Hero/Hero';
import DiscountPopup from '../components/DiscountPopup/DiscountPopup';
import Offerings from '../components/Offerings/Offerings';
import InspirationGallery from '../components/InspirationGallery/InspirationGallery';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import PriceCalculators from '../components/PriceCalculators/PriceCalculators';
import CustomerReviews from '../components/CustomerReviews/CustomerReviews';
import DeliveredHomes from '../components/DeliveredHomes/DeliveredHomes';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import TrendingProducts from '../components/TrendingProducts/TrendingProducts';
import FAQ from '../components/FAQ/FAQ';


export default function Home() {
  return (
    <>
      <DiscountPopup />
      <Hero />
      <Offerings />
      <InspirationGallery />
      <WhyChooseUs />
      <PriceCalculators />
      <CustomerReviews />
      <DeliveredHomes />
      <HowItWorks />
      <TrendingProducts />
      <FAQ />
    </>
  );
}
