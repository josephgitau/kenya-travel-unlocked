import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Star, Users, Car, Home, Utensils, Camera, Shield, Check, X, Calendar, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhotoGallery from '@/components/PhotoGallery';
import PricingCalculator from '@/components/PricingCalculator';
import BookingForm from '@/components/BookingForm';
import ReviewsSection from '@/components/ReviewsSection';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import SEO, { createPackageSchema } from '@/components/SEO';
import { Skeleton } from '@/components/ui/skeleton';
import { usePackage } from '@/hooks/usePackages';
// Fallback images
import heroImage from '@/assets/hero-safari.jpg';
import maraLodge from '@/assets/mara-lodge.jpg';
import maraLions from '@/assets/mara-lions.jpg';
import maraMigration from '@/assets/mara-migration.jpg';
import maraGameDrive from '@/assets/mara-game-drive.jpg';
import maraBalloon from '@/assets/mara-balloon.jpg';

// Amboseli images
import amboseli from '@/assets/amboseli.jpg';
import amboseliElephants from '@/assets/amboseli-elephants.jpg';
import amboseliLodge from '@/assets/amboseli-lodge.jpg';

// Diani Beach images
import dianiBeach from '@/assets/diani-beach.jpg';
import dianiOcean from '@/assets/diani-ocean.jpg';
import dianiResort from '@/assets/diani-resort.jpg';
import dianiSnorkeling from '@/assets/diani-snorkeling.jpg';

// Lake Naivasha images
import naivasha from '@/assets/naivasha.jpg';
import naivashaHippos from '@/assets/naivasha-hippos.jpg';
import naivashaBoat from '@/assets/naivasha-boat.jpg';
import naivashaWildlife from '@/assets/naivasha-wildlife.jpg';

// Samburu images
import samburu from '@/assets/samburu.jpg';
import samburuWildlife from '@/assets/samburu-wildlife.jpg';
import samburuRiver from '@/assets/samburu-river.jpg';
import samburuCulture from '@/assets/samburu-culture.jpg';

// Nairobi images
import nairobiPark from '@/assets/nairobi-park.jpg';
import nairobiElephants from '@/assets/nairobi-elephants.jpg';
import nairobiGiraffe from '@/assets/nairobi-giraffe.jpg';
import nairobiKaren from '@/assets/nairobi-karen.jpg';

// Map image paths to imported images
const imageMap: Record<string, string> = {
  '/src/assets/hero-safari.jpg': heroImage,
  '/src/assets/mara-lodge.jpg': maraLodge,
  '/src/assets/mara-lions.jpg': maraLions,
  '/src/assets/mara-migration.jpg': maraMigration,
  '/src/assets/mara-game-drive.jpg': maraGameDrive,
  '/src/assets/mara-balloon.jpg': maraBalloon,
  // Amboseli
  '/src/assets/amboseli.jpg': amboseli,
  '/src/assets/amboseli-elephants.jpg': amboseliElephants,
  '/src/assets/amboseli-lodge.jpg': amboseliLodge,
  // Diani Beach
  '/src/assets/diani-beach.jpg': dianiBeach,
  '/src/assets/diani-ocean.jpg': dianiOcean,
  '/src/assets/diani-resort.jpg': dianiResort,
  '/src/assets/diani-snorkeling.jpg': dianiSnorkeling,
  // Lake Naivasha
  '/src/assets/naivasha.jpg': naivasha,
  '/src/assets/naivasha-hippos.jpg': naivashaHippos,
  '/src/assets/naivasha-boat.jpg': naivashaBoat,
  '/src/assets/naivasha-wildlife.jpg': naivashaWildlife,
  // Samburu
  '/src/assets/samburu.jpg': samburu,
  '/src/assets/samburu-wildlife.jpg': samburuWildlife,
  '/src/assets/samburu-river.jpg': samburuRiver,
  '/src/assets/samburu-culture.jpg': samburuCulture,
  // Nairobi
  '/src/assets/nairobi-park.jpg': nairobiPark,
  '/src/assets/nairobi-elephants.jpg': nairobiElephants,
  '/src/assets/nairobi-giraffe.jpg': nairobiGiraffe,
  '/src/assets/nairobi-karen.jpg': nairobiKaren,
  // Also support bare filenames from database
  'nairobi-park.jpg': nairobiPark,
  'nairobi-elephants.jpg': nairobiElephants,
  'nairobi-giraffe.jpg': nairobiGiraffe,
  'nairobi-karen.jpg': nairobiKaren,
};

const getImageSrc = (path: string): string => {
  return imageMap[path] || path;
};

// Icon mapping for included items
const getIncludedIcon = (text: string) => {
  if (text.toLowerCase().includes('transport') || text.toLowerCase().includes('vehicle') || text.toLowerCase().includes('cruiser')) return Car;
  if (text.toLowerCase().includes('accommodation') || text.toLowerCase().includes('lodge') || text.toLowerCase().includes('camp') || text.toLowerCase().includes('resort')) return Home;
  if (text.toLowerCase().includes('meal') || text.toLowerCase().includes('breakfast') || text.toLowerCase().includes('lunch') || text.toLowerCase().includes('dinner')) return Utensils;
  if (text.toLowerCase().includes('game') || text.toLowerCase().includes('safari') || text.toLowerCase().includes('tour') || text.toLowerCase().includes('park')) return Camera;
  if (text.toLowerCase().includes('guide') || text.toLowerCase().includes('driver')) return Users;
  return Shield;
};

const PackageDetail = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const { data: pkg, isLoading, error } = usePackage(packageId || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        {/* Skeleton Hero */}
        <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <Skeleton className="absolute inset-0" />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
            <div className="max-w-3xl space-y-4">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-12 w-96" />
              <Skeleton className="h-6 w-full max-w-2xl" />
              <div className="flex gap-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-64 rounded-3xl" />
                <Skeleton className="h-96 rounded-3xl" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Package Not Found</h1>
          <p className="text-muted-foreground mb-8">The package you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get hero image (first image or fallback)
  const heroImg = pkg.images.length > 0 ? getImageSrc(pkg.images[0]) : heroImage;
  
  // Prepare gallery images
  const galleryImages = pkg.images.map((src, index) => ({
    src: getImageSrc(src),
    alt: `${pkg.name} - Image ${index + 1}`,
  }));

  // Prepare included items with icons
  const includedItems = pkg.included.map((text) => ({
    icon: getIncludedIcon(text),
    text,
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${pkg.name} | Awili Safaris`}
        description={pkg.short_description || pkg.description.substring(0, 160)}
        keywords={`${pkg.name}, ${pkg.location} safari, Kenya safari, ${pkg.category || 'safari'} package`}
        jsonLd={createPackageSchema({
          name: pkg.name,
          description: pkg.description,
          price: pkg.price_non_resident,
          duration: pkg.duration,
          location: pkg.location,
          image: heroImg,
          rating: pkg.rating || undefined,
          reviewsCount: pkg.reviews_count || undefined,
        })}
      />
      <Header />
      
      {/* Journey Breadcrumb */}
      <JourneyBreadcrumb 
        items={[
          { label: 'Packages', href: '/#destinations' },
          { label: pkg.location, href: `/destination/${pkg.location.toLowerCase().replace(/\s+/g, '-')}` },
          { label: pkg.name }
        ]} 
      />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
          {/* Package Info */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                {pkg.category || 'Safari'}
              </span>
              <div className="flex items-center gap-1.5 text-white">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{pkg.rating || 4.8}</span>
                <span className="text-white/60">({pkg.reviews_count || 0} reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {pkg.name}
            </h1>
            
            <p className="text-lg text-white/80 mb-6">
              {pkg.short_description || pkg.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {pkg.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {pkg.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {pkg.group_size || '2-8 guests'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Itinerary & Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Photo Gallery */}
              {galleryImages.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                    Photo Gallery
                  </h2>
                  <PhotoGallery images={galleryImages} />
                </div>
              )}

              {/* Day-by-Day Itinerary */}
              {pkg.itinerary.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8">
                    Day-by-Day Itinerary
                  </h2>
                  
                  <div className="space-y-6">
                    {pkg.itinerary.map((day, index) => (
                      <div
                        key={day.day}
                        className="relative pl-8 lg:pl-10"
                      >
                        {/* Timeline Line */}
                        {index !== pkg.itinerary.length - 1 && (
                          <div className="absolute left-[13px] lg:left-[17px] top-12 w-0.5 h-[calc(100%+24px)] bg-border" />
                        )}
                        
                        {/* Day Number */}
                        <div className="absolute left-0 top-0 w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-bold text-sm lg:text-base">
                            {day.day}
                          </span>
                        </div>

                        {/* Content Card */}
                        <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border">
                          <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                            Day {day.day}: {day.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {day.description}
                          </p>

                          {/* Highlights */}
                          {day.highlights && day.highlights.length > 0 && (
                            <div className="mb-6">
                              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                                Highlights
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {day.highlights.map((highlight) => (
                                  <span
                                    key={highlight}
                                    className="text-sm bg-primary/10 text-primary font-medium px-3 py-1.5 rounded-full"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Meals & Accommodation */}
                          {(day.meals || day.accommodation) && (
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                              {day.meals && day.meals.length > 0 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Utensils className="w-4 h-4 text-primary" />
                                  <span className="text-muted-foreground">
                                    Meals: <span className="text-foreground font-medium">{day.meals.join(', ')}</span>
                                  </span>
                                </div>
                              )}
                              {day.accommodation && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Home className="w-4 h-4 text-primary" />
                                  <span className="text-muted-foreground">
                                    Stay: <span className="text-foreground font-medium">{day.accommodation}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What's Included / Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="bg-safari/5 rounded-2xl p-6 lg:p-8 border border-safari/20">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-safari" />
                    What's Included
                  </h3>
                  <ul className="space-y-4">
                    {includedItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-safari/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-safari" />
                        </div>
                        <span className="text-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="bg-accent/5 rounded-2xl p-6 lg:p-8 border border-accent/20">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <X className="w-6 h-6 text-accent" />
                    What's Not Included
                  </h3>
                  <ul className="space-y-3">
                    {pkg.excluded.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Good to Know
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Best Time to Visit</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{pkg.best_time || 'Year-round'}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Difficulty Level</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{pkg.difficulty || 'Easy to Moderate'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Booking */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <PricingCalculator
                residentPrice={pkg.price_resident}
                nonResidentPrice={pkg.price_non_resident}
                childDiscount={30}
              />
              <BookingForm 
                packageId={pkg.id}
                packageName={pkg.name} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection packageId={pkg.id} packageName={pkg.name} />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PackageDetail;
