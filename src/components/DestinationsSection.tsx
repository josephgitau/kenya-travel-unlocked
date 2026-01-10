import { ArrowRight, Star, Clock, MapPin, Loader2, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePackages } from '@/hooks/usePackages';
import { useFilters } from '@/contexts/FilterContext';
import { useSearch } from '@/contexts/SearchContext';

// Fallback images
import maraImage from '@/assets/mara-lodge.jpg';
import amboseliImage from '@/assets/amboseli.jpg';
import dianiImage from '@/assets/diani-beach.jpg';
import samburuImage from '@/assets/samburu.jpg';
import naivashaImage from '@/assets/naivasha.jpg';

// Map image paths to imported images
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

interface DestinationCardProps {
  id: string;
  slug: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  duration: string;
  featured?: boolean;
  isResident: boolean;
}

const DestinationCard = ({ slug, name, location, image, price, rating, duration, featured, isResident }: DestinationCardProps) => {
  return (
    <Link 
      to={`/package/${slug}`}
      className={`destination-card group block ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${name} safari destination`}
          className="card-image w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 price-tag">
          {isResident ? `KES ${price.toLocaleString()}` : `$${price.toLocaleString()}`}
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
            Most Popular
          </div>
        )}
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            {name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-white font-medium">{rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{duration}</span>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DestinationsSection = () => {
  const { data: packages, isLoading, error } = usePackages();
  const { residentType, budgetType } = useFilters();
  const { searchQuery, setSearchQuery } = useSearch();

  const isResident = residentType === 'resident';

  // Filter packages based on budget and search query
  const filteredPackages = packages?.filter((pkg) => {
    const price = isResident ? pkg.price_resident : pkg.price_non_resident;
    
    // Search filter
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
      pkg.name.toLowerCase().includes(searchLower) ||
      pkg.location.toLowerCase().includes(searchLower) ||
      pkg.description.toLowerCase().includes(searchLower) ||
      pkg.category?.toLowerCase().includes(searchLower);

    // If there's an active search, prioritize search results and skip budget filter
    if (searchLower) {
      return matchesSearch;
    }
    
    // Budget filter only applies when not searching
    if (budgetType === 'budget') {
      return isResident ? price <= 30000 : price <= 400;
    } else if (budgetType === 'luxury') {
      return isResident ? price >= 50000 : price >= 600;
    }
    // mid-range
    return isResident ? (price > 30000 && price < 50000) : (price > 400 && price < 600);
  });

  if (isLoading) {
    return (
      <section id="destinations" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !packages || packages.length === 0) {
    return (
      <section id="destinations" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-muted-foreground">No destinations available at the moment.</p>
        </div>
      </section>
    );
  }

  // Use filtered packages or show all if no matches
  const displayPackages = filteredPackages && filteredPackages.length > 0 ? filteredPackages : packages;

  // Mark the first package as featured
  const destinationsWithFeatured = displayPackages.map((pkg, index) => ({
    ...pkg,
    featured: index === 0,
  }));

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Destinations</span>
            <h2 className="section-title mt-2">Explore Kenya's Finest</h2>
            <p className="section-subtitle mt-4">
              From the iconic Maasai Mara to the pristine shores of Diani, discover unforgettable destinations.
            </p>
          </div>
          <Link
            to="/#experiences"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Browse by Category
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Search Results Indicator */}
        {searchQuery && (
          <div className="flex items-center gap-3 mb-8 p-4 bg-muted rounded-xl">
            <Search className="w-5 h-5 text-primary" />
            <span className="text-foreground">
              {filteredPackages?.length === 0 ? (
                <>No results found for "<strong>{searchQuery}</strong>"</>
              ) : (
                <>Showing {filteredPackages?.length} result{filteredPackages?.length !== 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"</>
              )}
            </span>
            <button 
              onClick={() => setSearchQuery('')}
              className="ml-auto flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinationsWithFeatured.map((pkg) => (
            <DestinationCard
              key={pkg.id}
              id={pkg.id}
              slug={pkg.slug}
              name={pkg.name}
              location={pkg.location}
              image={getImageSrc(pkg.images)}
              price={isResident ? pkg.price_resident : pkg.price_non_resident}
              rating={pkg.rating || 4.8}
              duration={pkg.duration}
              featured={pkg.featured}
              isResident={isResident}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
