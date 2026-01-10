import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FilterBar from '@/components/FilterBar';
import DestinationsSection from '@/components/DestinationsSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ItinerarySection from '@/components/ItinerarySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
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
        <FilterBar />
        <DestinationsSection />
        <ExperiencesSection />
        <ItinerarySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
