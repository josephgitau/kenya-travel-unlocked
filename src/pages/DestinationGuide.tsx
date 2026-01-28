import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Clock, Star, Users, Sun, CloudRain, Camera, Binoculars, 
  Home, Utensils, Car, Plane, Moon, Mountain, Fish, Ship, Footprints, Wind, 
  TreeDeciduous, Droplets, Shield, Bike, ChevronRight, Sparkles,
  Calendar, ThermometerSun, CheckCircle2, Phone, MessageCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhotoGallery from '@/components/PhotoGallery';
import SEO from '@/components/SEO';
import { usePackages } from '@/hooks/usePackages';
import { destinationsData, destinationPreviews } from '@/data/destinations';

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Binoculars: <Binoculars className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Moon: <Moon className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Mountain: <Mountain className="w-5 h-5" />,
  Fish: <Fish className="w-5 h-5" />,
  Ship: <Ship className="w-5 h-5" />,
  Footprints: <Footprints className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  TreeDeciduous: <TreeDeciduous className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Horse: <Car className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Bike: <Bike className="w-5 h-5" />,
};

const DestinationGuide = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { data: packages } = usePackages();

  const destination = destinationSlug ? destinationsData[destinationSlug] : null;

  const relatedPackages = packages?.filter((pkg) =>
    pkg.location.toLowerCase().includes(destination?.name.toLowerCase() || '') ||
    pkg.name.toLowerCase().includes(destination?.name.toLowerCase() || '')
  ).slice(0, 3);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Destination Not Found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The destination you're looking for doesn't exist.
          </p>
          <Link to="/destinations" className="btn-gold inline-flex items-center gap-2">
            View All Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const galleryImages = destination.gallery.map((src, i) => ({
    src,
    alt: `${destination.name} - Photo ${i + 1}`
  }));

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${destination.name} Safari Guide | Awili Safaris`}
        description={destination.description.substring(0, 160)}
        keywords={`${destination.name} safari, ${destination.name} Kenya, ${destination.name} wildlife`}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${destination.heroImage})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/20" />
        
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-white flex items-center gap-1">
                <Home className="w-4 h-4" /> Home
              </Link>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <Link to="/destinations" className="hover:text-white">Destinations</Link>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <span className="text-white font-medium">{destination.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-end pb-0">
          <div className="w-full">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground text-xs font-bold px-4 py-2 rounded-full mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {destination.category === 'safari' ? 'Safari Park' : 
                 destination.category === 'beach' ? 'Beach' : 
                 destination.category === 'rift-valley' ? 'Rift Valley' : 'Adventure'}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                {destination.name}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {destination.tagline}
              </p>
            </div>
            
            {/* Stats Cards - Overlapping Hero */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 translate-y-8 md:translate-y-12">
              <div className="bg-card rounded-2xl p-4 shadow-elevated border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Best Time</p>
                    <p className="font-bold text-foreground text-sm">{destination.bestTime.peak[0]} - {destination.bestTime.peak[destination.bestTime.peak.length - 1]}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-4 shadow-elevated border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Binoculars className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Wildlife</p>
                    <p className="font-bold text-foreground text-sm">{destination.wildlife.length}+ Species</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-4 shadow-elevated border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">From Nairobi</p>
                    <p className="font-bold text-foreground text-sm">{destination.gettingThere.fromNairobi.split(',')[0]}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-2xl p-4 shadow-elevated border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ThermometerSun className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="font-bold text-foreground text-sm">{destination.weather.temp.split('(')[0].trim()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-16 md:pt-20 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Overview */}
          <div className="max-w-4xl mb-16">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
              About {destination.name}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {destination.description}
            </p>
            <div className="flex items-start gap-4 p-5 bg-muted/50 rounded-2xl">
              <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">History & Heritage</h3>
                <p className="text-muted-foreground text-sm">{destination.history}</p>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-16">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
              Gallery
            </h2>
            <PhotoGallery images={galleryImages} />
          </div>

          {/* Wildlife Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                Wildlife You'll See
              </h2>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                {destination.wildlife.length} species
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.wildlife.map((animal, index) => (
                <div 
                  key={index} 
                  className="group p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-safari/10 flex items-center justify-center shrink-0">
                      <Binoculars className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {animal.name}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{animal.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {animal.bestTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout: Activities + Practical Info */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            {/* Activities - Takes 3 columns */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Things to Do
              </h2>
              <div className="space-y-3">
                {destination.activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {iconMap[activity.iconName] || <Camera className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{activity.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-1">{activity.description}</p>
                    </div>
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full shrink-0">
                      {activity.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-5">
              {/* When to Visit */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  When to Visit
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-safari/10 rounded-xl border border-safari/20">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-safari fill-safari" />
                      <span className="font-medium text-foreground text-sm">Peak Season</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{destination.bestTime.peak.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-medium text-foreground text-sm">Good Season</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{destination.bestTime.good.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                      <span className="font-medium text-foreground text-sm">Low Season</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{destination.bestTime.low.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Weather */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-primary" />
                  Weather
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl text-center">
                    <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Dry Season</p>
                    <p className="text-xs font-medium text-foreground">{destination.weather.dry}</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-center">
                    <CloudRain className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Wet Season</p>
                    <p className="text-xs font-medium text-foreground">{destination.weather.wet}</p>
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-xl">
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="font-bold text-foreground">{destination.weather.temp}</p>
                </div>
              </div>

              {/* Getting There */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Getting There
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{destination.gettingThere.byRoad}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{destination.gettingThere.byAir}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Where to Stay */}
          <div className="mb-16">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
              Where to Stay
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.lodges.map((lodge, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-card rounded-2xl border border-border hover:shadow-card transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{lodge.name}</h3>
                      <span className="text-xs text-primary font-medium">{lodge.type}</span>
                    </div>
                    <span className="text-xl font-bold text-primary">{lodge.priceRange}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{lodge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insider Tips + Quick Facts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {/* Insider Tips */}
            <div className="bg-gradient-to-br from-safari/10 to-primary/5 rounded-2xl p-6 border border-safari/20">
              <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-safari" />
                Insider Tips
              </h3>
              <ul className="space-y-3">
                {destination.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-safari fill-safari shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Facts */}
            <div className="bg-muted/50 rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {destination.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">{fact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                {destination.name} Safari Packages
              </h2>
              <Link to="/#destinations" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPackages.map((pkg) => (
                <Link 
                  key={pkg.id} 
                  to={`/package/${pkg.slug}`} 
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                      style={{ backgroundImage: `url(${pkg.images?.[0] || '/placeholder.svg'})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                        {pkg.duration}
                      </span>
                      <span className="bg-primary text-primary-foreground font-bold px-3 py-1.5 rounded-full text-sm">
                        ${pkg.price_non_resident.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {pkg.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                        {pkg.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Destinations */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            Explore More Destinations
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {destinationPreviews
              .filter(d => d.slug !== destinationSlug)
              .map((dest) => (
                <Link
                  key={dest.slug}
                  to={`/destination/${dest.slug}`}
                  className="flex items-center gap-2 bg-muted hover:bg-primary/10 rounded-full px-4 py-2 transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }} />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                    {dest.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Floating CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-elevated p-3 md:p-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-bold text-foreground">{destination.name}</p>
            <p className="text-xs text-muted-foreground">Best time: {destination.bestTime.peak[0]} - {destination.bestTime.peak[destination.bestTime.peak.length - 1]}</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a 
              href="tel:+254700000000" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted hover:bg-muted/80 transition-colors flex-1 sm:flex-none"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground hidden md:inline">Call Us</span>
            </a>
            <Link 
              to="/quote" 
              className="btn-gold flex-1 sm:flex-none text-center py-2.5 px-6"
            >
              Plan Your Safari
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom spacing for fixed bar */}
      <div className="h-20" />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationGuide;
