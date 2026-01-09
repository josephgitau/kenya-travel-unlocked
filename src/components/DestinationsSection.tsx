import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import maraImage from '@/assets/mara-lodge.jpg';
import amboseliImage from '@/assets/amboseli.jpg';
import dianiImage from '@/assets/diani-beach.jpg';
import samburuImage from '@/assets/samburu.jpg';
import naivashaImage from '@/assets/naivasha.jpg';

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  days: string;
  featured?: boolean;
}

const destinations: Destination[] = [
  {
    id: 'mara',
    name: 'Maasai Mara',
    location: 'Narok County',
    image: maraImage,
    price: 25000,
    rating: 4.9,
    days: '3-5 Days',
    featured: true,
  },
  {
    id: 'amboseli',
    name: 'Amboseli',
    location: 'Kajiado County',
    image: amboseliImage,
    price: 22000,
    rating: 4.8,
    days: '2-3 Days',
  },
  {
    id: 'diani',
    name: 'Diani Beach',
    location: 'Kwale County',
    image: dianiImage,
    price: 18000,
    rating: 4.7,
    days: '4-7 Days',
  },
  {
    id: 'samburu',
    name: 'Samburu',
    location: 'Samburu County',
    image: samburuImage,
    price: 28000,
    rating: 4.8,
    days: '3-4 Days',
  },
  {
    id: 'naivasha',
    name: 'Lake Naivasha',
    location: 'Nakuru County',
    image: naivashaImage,
    price: 12000,
    rating: 4.6,
    days: '1-2 Days',
  },
];

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <Link 
      to={`/package/${destination.id}`}
      className={`destination-card group block ${destination.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.name} safari destination`}
          className="card-image w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute top-4 right-4 price-tag">
          From KES {destination.price.toLocaleString()}
        </div>

        {/* Featured Badge */}
        {destination.featured && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full">
            Most Popular
          </div>
        )}
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            {destination.location}
          </div>
          
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            {destination.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-white font-medium">{destination.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{destination.days}</span>
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
          <a
            href="#all-destinations"
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All Destinations
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
