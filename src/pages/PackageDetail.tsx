import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Star, Users, Car, Home, Utensils, Camera, Shield, Check, X, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhotoGallery from '@/components/PhotoGallery';
import PricingCalculator from '@/components/PricingCalculator';
import BookingForm from '@/components/BookingForm';

// Images
import heroImage from '@/assets/hero-safari.jpg';
import maraLodge from '@/assets/mara-lodge.jpg';
import maraLions from '@/assets/mara-lions.jpg';
import maraMigration from '@/assets/mara-migration.jpg';
import maraGameDrive from '@/assets/mara-game-drive.jpg';
import maraBalloon from '@/assets/mara-balloon.jpg';

const packageData = {
  mara: {
    id: 'mara',
    name: '3 Days Maasai Mara Safari',
    tagline: 'Experience the legendary Maasai Mara with game drives and luxurious camp stays',
    location: 'Narok County, Kenya',
    duration: '3 Days / 2 Nights',
    groupSize: '2-6 Guests',
    rating: 4.9,
    reviews: 247,
    heroImage: heroImage,
    images: [
      { src: maraLodge, alt: 'Luxury safari lodge overlooking the Mara' },
      { src: maraLions, alt: 'Lion pride resting under acacia tree' },
      { src: maraMigration, alt: 'Great Wildebeest Migration crossing the Mara River' },
      { src: maraGameDrive, alt: 'Safari game drive at sunset' },
      { src: maraBalloon, alt: 'Hot air balloon safari at sunrise' },
    ],
    pricing: {
      resident: 25000,
      nonResident: 450,
      singleSupplement: 8000,
      childDiscount: 30,
    },
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara',
        description: 'Depart Nairobi early morning (7:00 AM) and drive through the scenic Great Rift Valley. Stop at the viewpoint for breathtaking views and photo opportunities. Continue to the Mara, arriving in time for lunch at your camp. After settling in, embark on an afternoon game drive to spot the Big 5.',
        highlights: ['Great Rift Valley viewpoint', 'Scenic drive through Narok', 'Afternoon game drive', 'Sundowner experience'],
        meals: ['Lunch', 'Dinner'],
        accommodation: 'Mara Leisure Camp or similar',
      },
      {
        day: 2,
        title: 'Full Day in the Mara',
        description: 'Wake up early for a sunrise game drive when predators are most active. Return for a hearty breakfast, then choose to relax or join an optional Maasai village visit. Enjoy another game drive in the afternoon, focusing on the Mara River area where crocodiles and hippos abound.',
        highlights: ['Sunrise game drive', 'Mara River crossing point', 'Optional Maasai village visit', 'Sundowner with views'],
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mara Leisure Camp or similar',
      },
      {
        day: 3,
        title: 'Mara to Nairobi',
        description: 'Optional early morning game drive or balloon safari (extra cost). After breakfast, check out and begin the journey back to Nairobi. Stop at local curio shops for souvenirs. Arrive in Nairobi by late afternoon/evening.',
        highlights: ['Optional balloon safari', 'Final game drive', 'Souvenir shopping', 'Return to Nairobi by 6PM'],
        meals: ['Breakfast', 'Lunch (picnic)'],
        accommodation: 'N/A - Return to Nairobi',
      },
    ],
    included: [
      { icon: Car, text: 'Transport in 4x4 Land Cruiser with pop-up roof' },
      { icon: Home, text: '2 nights accommodation at safari camp' },
      { icon: Utensils, text: 'All meals as per itinerary (Full board)' },
      { icon: Camera, text: 'Park entrance fees & game drives' },
      { icon: Users, text: 'English-speaking professional driver guide' },
      { icon: Shield, text: 'Flying Doctors emergency evacuation cover' },
    ],
    excluded: [
      'Tips and gratuities',
      'Travel insurance',
      'Drinks and alcoholic beverages',
      'Hot air balloon safari (USD 450)',
      'Maasai village visit (USD 25)',
      'Personal expenses',
    ],
    bestTime: 'July to October for the Great Migration, but excellent year-round',
    difficulty: 'Easy - suitable for all ages',
  },
};

const PackageDetail = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const pkg = packageData[packageId as keyof typeof packageData] || packageData.mara;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pkg.heroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-24 left-4 lg:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </Link>

          {/* Package Info */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                Best Seller
              </span>
              <div className="flex items-center gap-1.5 text-white">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-white/60">({pkg.reviews} reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {pkg.name}
            </h1>
            
            <p className="text-lg text-white/80 mb-6">
              {pkg.tagline}
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
                {pkg.groupSize}
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
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Photo Gallery
                </h2>
                <PhotoGallery images={pkg.images} />
              </div>

              {/* Day-by-Day Itinerary */}
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

                        {/* Meals & Accommodation */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-2 text-sm">
                            <Utensils className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              Meals: <span className="text-foreground font-medium">{day.meals.join(', ')}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Home className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">
                              Stay: <span className="text-foreground font-medium">{day.accommodation}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included / Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="bg-safari/5 rounded-2xl p-6 lg:p-8 border border-safari/20">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Check className="w-6 h-6 text-safari" />
                    What's Included
                  </h3>
                  <ul className="space-y-4">
                    {pkg.included.map((item, index) => (
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
                    <p className="text-muted-foreground text-sm">{pkg.bestTime}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Difficulty Level</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{pkg.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing & Booking */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <PricingCalculator
                residentPrice={pkg.pricing.resident}
                nonResidentPrice={pkg.pricing.nonResident}
                singleSupplement={pkg.pricing.singleSupplement}
                childDiscount={pkg.pricing.childDiscount}
              />
              <BookingForm packageName={pkg.name} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PackageDetail;
