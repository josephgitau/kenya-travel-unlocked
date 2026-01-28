import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Star, Shield, Clock, Users } from 'lucide-react';
import heroImage from '@/assets/hero-safari.jpg';

const TrustStrip = () => {
  const trustItems = [
    { icon: Users, text: '500+ Happy Travelers', value: '' },
    { icon: Star, text: '4.9★ Average Rating', value: '' },
    { icon: Shield, text: 'Licensed TRA Operator', value: '' },
    { icon: Clock, text: '24/7 Support', value: '' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-10 animate-fade-in-up stagger-4">
      {trustItems.map((item, index) => (
        <div 
          key={item.text}
          className="flex items-center gap-2 text-white/80 text-xs sm:text-sm"
        >
          <item.icon className="w-4 h-4 text-primary" />
          <span>{item.text}</span>
          {index < trustItems.length - 1 && (
            <span className="hidden sm:block w-px h-4 bg-white/30 ml-4" />
          )}
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const scrollToPackages = () => {
    const section = document.getElementById('popular-packages');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">Award-Winning Safari Experiences</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6 animate-fade-in-up stagger-1">
            Kenya Safaris,
            <span className="block text-primary mt-1 sm:mt-2">Tailored Just for You</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-2 animate-fade-in-up stagger-2">
            From the Great Migration to pristine beaches, we craft unforgettable 
            journeys with Kenya's most trusted tour operator.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link 
              to="/destinations"
              className="btn-gold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Browse Safari Packages
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/quote"
              className="group flex items-center gap-2 w-full sm:w-auto justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Get Instant Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Quiz Link */}
          <Link 
            to="/quiz"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mt-6 transition-colors animate-fade-in-up stagger-4"
          >
            <span>Not sure where to go?</span>
            <span className="text-primary underline underline-offset-4">Take our Safari Quiz</span>
          </Link>

          {/* Trust Strip */}
          <TrustStrip />
        </div>

        {/* Scroll Indicator - hidden on very small screens */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button 
            onClick={scrollToPackages}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
