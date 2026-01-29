import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowWeWork from '@/components/HowWeWork';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import ItinerarySection from '@/components/ItinerarySection';
import PopularPackages from '@/components/PopularPackages';
import WhyChooseUs from '@/components/WhyChooseUs';
import PlanYourTrip from '@/components/PlanYourTrip';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTopButton from '@/components/BackToTopButton';
import CookieConsent from '@/components/CookieConsent';
import SEO, { createOrganizationSchema } from '@/components/SEO';

const Index = () => {
  const location = useLocation();

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);
  
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SEO jsonLd={createOrganizationSchema()} />
      <Header />
      <main>
        <HeroSection />
        <HowWeWork />
        <FeaturedExperiences />
        <PopularPackages />
        <ItinerarySection />
        <WhyChooseUs />
        <PlanYourTrip />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
      <CookieConsent />
    </div>
  );
};

export default Index;
