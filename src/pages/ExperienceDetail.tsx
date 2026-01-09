import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Clock, MapPin, Binoculars, Umbrella, Mountain, Coffee, Mail } from 'lucide-react';
import { usePackages } from '@/hooks/usePackages';
import { useFilters } from '@/contexts/FilterContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';

// Fallback images
import maraImage from '@/assets/hero-safari.jpg';
import dianiImage from '@/assets/diani-beach.jpg';
import samburuImage from '@/assets/samburu.jpg';
import naivashaImage from '@/assets/naivasha.jpg';
import amboseliImage from '@/assets/amboseli.jpg';
import maraLodgeImage from '@/assets/mara-lodge.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/mara-lodge.jpg': maraLodgeImage,
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

interface ExperienceConfig {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  icon: React.ElementType;
  color: string;
  dbCategory: string; // Category name as stored in database
}

const experienceConfigs: Record<string, ExperienceConfig> = {
  bush: {
    id: 'bush',
    category: 'Bush',
    title: 'Big 5 Safaris',
    subtitle: 'Wild Encounters Await',
    description: 'Witness the Great Migration and encounter lions, elephants, leopards, rhinos, and buffalo in their natural habitat. Our bush safaris take you deep into Kenya\'s most iconic national parks and reserves.',
    heroImage: maraImage,
    icon: Binoculars,
    color: 'bg-safari',
    dbCategory: 'Bush',
  },
  beach: {
    id: 'beach',
    category: 'Beach',
    title: 'Coastal Paradise',
    subtitle: 'Sun, Sand & Serenity',
    description: 'Relax on pristine white sand beaches with crystal-clear turquoise waters of the Indian Ocean. From Diani to Watamu, experience Kenya\'s stunning coastline.',
    heroImage: dianiImage,
    icon: Umbrella,
    color: 'bg-primary',
    dbCategory: 'Beach',
  },
  adrenaline: {
    id: 'adrenaline',
    category: 'Adrenaline',
    title: 'Mountain Adventures',
    subtitle: 'Conquer New Heights',
    description: 'Challenge yourself with thrilling hikes up Mt. Kenya and Mt. Longonot. Witness breathtaking views from the summit and push your limits.',
    heroImage: samburuImage,
    icon: Mountain,
    color: 'bg-accent',
    dbCategory: 'Adrenaline',
  },
  staycation: {
    id: 'staycation',
    category: 'Staycation',
    title: 'Weekend Escapes',
    subtitle: 'Unwind & Recharge',
    description: 'Escape the city with quick getaways to serene lakes, wildlife sanctuaries, and peaceful retreats just a short drive from Nairobi.',
    heroImage: naivashaImage,
    icon: Coffee,
    color: 'bg-earth',
    dbCategory: 'Staycation',
  },
};

const ExperienceDetail = () => {
  const { experienceType } = useParams<{ experienceType: string }>();
  const { data: packages, isLoading } = usePackages();
  const { residentType } = useFilters();

  const isResident = residentType === 'resident';
  const config = experienceType ? experienceConfigs[experienceType.toLowerCase()] : null;

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Experience Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Filter packages by category
  const filteredPackages = packages?.filter(
    (pkg) => pkg.category?.toLowerCase() === config.dbCategory.toLowerCase()
  );

  const hasPackages = filteredPackages && filteredPackages.length > 0;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pb-12 lg:pb-16">
          {/* Breadcrumb */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 ${config.color} rounded-2xl flex items-center justify-center`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-primary font-semibold uppercase tracking-wider">
              {config.category} Experience
            </span>
          </div>
          
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3">
            {config.title}
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-2xl">
            {config.subtitle}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Description */}
          <div className="max-w-3xl mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {config.description}
            </p>
          </div>

          {hasPackages ? (
            <>
              <h2 className="section-title mb-8">
                Available {config.category} Packages
              </h2>
              
              {/* Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <Link 
                    key={pkg.id}
                    to={`/package/${pkg.slug}`}
                    className="destination-card group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={getImageSrc(pkg.images)}
                        alt={`${pkg.name} safari destination`}
                        className="card-image w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 right-4 price-tag">
                        {isResident ? `KES ${pkg.price_resident.toLocaleString()}` : `$${pkg.price_non_resident.toLocaleString()}`}
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                          <MapPin className="w-4 h-4" />
                          {pkg.location}
                        </div>
                        
                        <h3 className="font-display text-2xl font-bold text-white mb-3">
                          {pkg.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <span className="text-white font-medium">{pkg.rating || 4.8}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/70">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{pkg.duration}</span>
                            </div>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary">
                            <ArrowRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Coming Soon State */
            <div className="text-center py-16 lg:py-24 bg-sand rounded-3xl">
              <div className={`w-20 h-20 ${config.color} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Coming Soon!
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Our {config.title.toLowerCase()} are currently being curated. 
                Contact us to plan a custom {config.category.toLowerCase()} adventure tailored just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2">
                    <Mail className="w-5 h-5" />
                    Plan Custom Adventure
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button variant="outline" size="lg" className="gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Explore Other Experiences
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ExperienceDetail;
