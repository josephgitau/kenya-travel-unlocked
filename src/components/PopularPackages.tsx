import { ArrowRight, Star, Clock, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { usePackages } from '@/hooks/usePackages';
import { SkeletonCardGrid } from '@/components/SkeletonCard';

// Fallback images
import maraImage from '@/assets/mara-lodge.jpg';
import amboseliImage from '@/assets/amboseli.jpg';
import dianiImage from '@/assets/diani-beach.jpg';
import samburuImage from '@/assets/samburu.jpg';
import naivashaImage from '@/assets/naivasha.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/mara-lodge.jpg': maraImage,
  '/src/assets/amboseli.jpg': amboseliImage,
  '/src/assets/diani-beach.jpg': dianiImage,
  '/src/assets/samburu.jpg': samburuImage,
  '/src/assets/naivasha.jpg': naivashaImage,
};

const getImageSrc = (images: string[]): string => {
  if (images.length === 0) return maraImage;
  const firstImage = images[0];
  return imageMap[firstImage] || firstImage;
};

interface PackageCardProps {
  slug: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
  isBestSeller?: boolean;
}

const PackageCard = ({ slug, name, location, image, price, rating, duration, isBestSeller }: PackageCardProps) => {
  return (
    <Link 
      to={`/package/${slug}`}
      className="group flex-shrink-0 w-[300px] sm:w-[340px] bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${name} safari package`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Best Seller Badge */}
        {isBestSeller && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Most Booked
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/90 text-sm">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-muted-foreground text-xs block">From</span>
            <span className="text-primary text-xl font-bold">${price.toLocaleString()}</span>
          </div>
          
          <button className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const PopularPackages = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: packages, isLoading, error } = usePackages();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <section id="popular-packages" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Popular Packages</span>
            <h2 className="section-title mt-2">Traveler Favorites</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCardGrid count={3} variant="destination" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !packages || packages.length === 0) {
    return null;
  }

  // Sort by rating and take top packages
  const topPackages = [...packages]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 8);

  return (
    <section id="popular-packages" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Popular Packages</span>
            <h2 className="section-title mt-2">Traveler Favorites</h2>
            <p className="section-subtitle mt-3">
              Our most loved safari experiences, handpicked by fellow adventurers.
            </p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        >
          {topPackages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              slug={pkg.slug}
              name={pkg.name}
              location={pkg.location}
              image={getImageSrc(pkg.images)}
              price={pkg.price_non_resident}
              rating={pkg.rating || 4.8}
              duration={pkg.duration}
              isBestSeller={index === 0}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link 
            to="/destinations"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
