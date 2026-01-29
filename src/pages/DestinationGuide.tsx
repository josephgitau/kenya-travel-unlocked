import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, MapPin, Clock, Star, Users, Sun, CloudRain, Camera, Binoculars, 
  Home, Utensils, Car, Plane, Moon, Mountain, Fish, Ship, Footprints, Wind, 
  TreeDeciduous, Droplets, Shield, Bike, ChevronRight, Sparkles, ChevronDown,
  Calendar, ThermometerSun, CheckCircle2, Phone, MessageCircle, Target, Timer,
  Crown, Award, TrendingUp
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PhotoGallery from '@/components/PhotoGallery';
import SEO from '@/components/SEO';
import { usePackages } from '@/hooks/usePackages';
import { destinationsData, destinationPreviews } from '@/data/destinations';
import { Badge } from '@/components/ui/badge';

// Icon mapping for activities
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

// Wildlife emoji mapping for visual personality
const getWildlifeEmoji = (name: string): string => {
  const emojiMap: Record<string, string> = {
    'lion': '🦁',
    'lions': '🦁',
    'elephant': '🐘',
    'elephants': '🐘',
    'zebra': '🦓',
    'zebras': '🦓',
    'giraffe': '🦒',
    'giraffes': '🦒',
    'leopard': '🐆',
    'leopards': '🐆',
    'cheetah': '🐆',
    'cheetahs': '🐆',
    'buffalo': '🦬',
    'buffalos': '🦬',
    'rhino': '🦏',
    'rhinos': '🦏',
    'hippo': '🦛',
    'hippos': '🦛',
    'crocodile': '🐊',
    'crocodiles': '🐊',
    'bird': '🦅',
    'birds': '🦅',
    'flamingo': '🦩',
    'flamingos': '🦩',
    'monkey': '🐒',
    'monkeys': '🐒',
    'gorilla': '🦍',
    'hyena': '🐕',
    'hyenas': '🐕',
    'wild dog': '🐕',
    'wild dogs': '🐕',
    'wildebeest': '🐃',
    'migration': '🐃',
    'big five': '🏆',
    'big cats': '🦁',
    'oryx': '🦌',
    'gerenuk': '🦌',
    'waterbuck': '🦌',
    'default': '🦁'
  };
  
  const lowerName = name.toLowerCase();
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerName.includes(key)) return emoji;
  }
  return emojiMap.default;
};

// Get viewing probability based on best time
const getViewingProbability = (bestTime: string): { label: string; color: string } => {
  const time = bestTime.toLowerCase();
  if (time.includes('year-round') || time.includes('always')) {
    return { label: 'Excellent', color: 'bg-safari' };
  } else if (time.includes('variable') || time.includes('occasional')) {
    return { label: 'Rare', color: 'bg-amber-500' };
  }
  return { label: 'Good', color: 'bg-primary' };
};

// Trust Strip Component - matches homepage pattern
const DestinationTrustStrip = ({ destination }: { destination: any }) => {
  const trustItems = [
    { 
      icon: '🦁', 
      text: destination.wildlife.some((w: any) => w.name.toLowerCase().includes('big five')) 
        ? 'Big 5 Destination' 
        : `${destination.wildlife.length}+ Species` 
    },
    { icon: '⭐', text: 'Top Rated' },
    { icon: '🛡️', text: 'Expert Guides' },
    { icon: '📸', text: 'Photo Paradise' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 animate-fade-in-up stagger-4">
      {trustItems.map((item, index) => (
        <div 
          key={item.text}
          className="flex items-center gap-2 text-white/90 text-xs sm:text-sm"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="font-medium">{item.text}</span>
          {index < trustItems.length - 1 && (
            <span className="hidden sm:block w-px h-4 bg-white/30 ml-3" />
          )}
        </div>
      ))}
    </div>
  );
};

// Quick Decision Module - matches HowWeWork style
const QuickDecisionModule = ({ destination }: { destination: any }) => {
  const decisions = [
    {
      icon: Calendar,
      label: 'Best Time',
      value: `${destination.bestTime.peak[0]} - ${destination.bestTime.peak[destination.bestTime.peak.length - 1]}`,
      sublabel: 'Peak Season',
    },
    {
      icon: Target,
      label: 'Ideal For',
      value: destination.category === 'safari' ? 'Wildlife & Nature' : 
             destination.category === 'beach' ? 'Beach & Relaxation' : 'Adventure & Culture',
      sublabel: destination.category === 'safari' ? 'Big 5 Spotting' : 
                destination.category === 'beach' ? 'Water Activities' : 'Unique Experience',
    },
    {
      icon: Timer,
      label: 'Recommended Stay',
      value: destination.category === 'safari' ? '3-5 Days' : 
             destination.category === 'beach' ? '4-7 Days' : '2-3 Days',
      sublabel: 'For Full Experience',
    },
  ];

  return (
    <section className="py-12 bg-card border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {decisions.map((item, index) => (
            <div key={item.label} className="relative text-center group">
              {/* Connector Line (desktop only) */}
              {index < decisions.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}
              
              {/* Icon Container */}
              <div className="relative inline-flex mb-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-9 h-9 text-primary" />
                </div>
              </div>

              {/* Content */}
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                {item.value}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section Header Component - consistent pattern
const SectionHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
  <div className="mb-8">
    <span className="text-primary font-semibold uppercase tracking-wider text-sm">{label}</span>
    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
    )}
  </div>
);

const DestinationGuide = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { data: packages } = usePackages();

  const destination = destinationSlug ? destinationsData[destinationSlug] : null;

  const relatedPackages = packages?.filter((pkg) =>
    pkg.location.toLowerCase().includes(destination?.name.toLowerCase() || '') ||
    pkg.name.toLowerCase().includes(destination?.name.toLowerCase() || '')
  ).slice(0, 4);

  const scrollToContent = () => {
    const section = document.getElementById('destination-content');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Get minimum price from related packages
  const minPrice = relatedPackages?.reduce((min, pkg) => 
    pkg.price_non_resident < min ? pkg.price_non_resident : min, 
    relatedPackages[0]?.price_non_resident || 0
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${destination.name} Safari Guide | Awili Safaris`}
        description={destination.description.substring(0, 160)}
        keywords={`${destination.name} safari, ${destination.name} Kenya, ${destination.name} wildlife`}
      />
      <Header />

      {/* ========== PREMIUM HERO SECTION ========== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-Ready Styling */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" 
          style={{ backgroundImage: `url(${destination.heroImage})` }} 
        />
        
        {/* Gradient Overlay - matches homepage */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        
        {/* Breadcrumb - Top Positioned */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/80 animate-fade-in-up">
              <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <Home className="w-4 h-4" /> Home
              </Link>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <span className="text-white font-medium">{destination.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge with Pulse */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                {destination.category === 'safari' ? 'Top Safari Destination' : 
                 destination.category === 'beach' ? 'Premium Beach Paradise' : 
                 destination.category === 'rift-valley' ? 'Rift Valley Wonder' : 'Must-Visit Destination'}
              </span>
            </div>

            {/* Headline with Gold Accent */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4 animate-fade-in-up stagger-1">
              {destination.name}
              <span className="block text-primary mt-2 text-2xl sm:text-3xl md:text-4xl font-normal">
                {destination.tagline}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
              {destination.description.split('.')[0]}.
            </p>

            {/* Glass-Morphism Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-in-up stagger-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs text-white/70">Best Time</p>
                  <p className="font-bold text-white text-sm">
                    {destination.bestTime.peak[0]} - {destination.bestTime.peak[destination.bestTime.peak.length - 1]}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <Binoculars className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs text-white/70">Wildlife</p>
                  <p className="font-bold text-white text-sm">{destination.wildlife.length}+ Species</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <Car className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs text-white/70">From Nairobi</p>
                  <p className="font-bold text-white text-sm">{destination.gettingThere.fromNairobi.split(',')[0]}</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <ThermometerSun className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs text-white/70">Temperature</p>
                  <p className="font-bold text-white text-sm">{destination.weather.temp.split('(')[0].trim()}</p>
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <DestinationTrustStrip destination={destination} />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
            <button 
              onClick={scrollToContent}
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
            >
              <span className="text-xs font-medium uppercase tracking-wider">Discover More</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ========== QUICK DECISION MODULE ========== */}
      <QuickDecisionModule destination={destination} />

      {/* ========== MAIN CONTENT ========== */}
      <section id="destination-content" className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* ===== ABOUT SECTION ===== */}
          <div className="max-w-4xl mb-20">
            <SectionHeader 
              label="Overview" 
              title={`About ${destination.name}`}
              subtitle="Everything you need to know for your perfect safari experience"
            />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {destination.description}
            </p>
            <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-primary/5 to-safari/5 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">History & Heritage</h3>
                <p className="text-muted-foreground text-sm">{destination.history}</p>
              </div>
            </div>
          </div>

          {/* ===== WILDLIFE SPOTLIGHT SECTION ===== */}
          <div className="mb-20">
            <SectionHeader 
              label="Wildlife" 
              title="Wildlife You'll See"
              subtitle={`Home to ${destination.wildlife.length}+ remarkable species`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {destination.wildlife.map((animal, index) => {
                const probability = getViewingProbability(animal.bestTime);
                const emoji = getWildlifeEmoji(animal.name);
                const isSignature = index === 0;
                
                return (
                  <div 
                    key={index} 
                    className={`group relative p-6 rounded-2xl border transition-all hover:shadow-elevated ${
                      isSignature 
                        ? 'bg-gradient-to-br from-primary/10 via-safari/5 to-transparent border-primary/30 md:col-span-2 lg:col-span-1' 
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    {/* Signature Badge */}
                    {isSignature && (
                      <div className="absolute -top-3 left-4">
                        <Badge className="bg-primary text-primary-foreground gap-1">
                          <Crown className="w-3 h-3" />
                          Signature Sighting
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Emoji Icon */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-3xl ${
                        isSignature ? 'bg-primary/20' : 'bg-gradient-to-br from-primary/15 to-safari/10'
                      }`}>
                        {emoji}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {animal.name}
                          </h3>
                          {/* Probability Badge */}
                          <span className={`inline-flex items-center gap-1 text-[10px] text-white font-semibold px-2 py-0.5 rounded-full ${probability.color}`}>
                            {probability.label}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{animal.description}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          {animal.bestTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== ACTIVITIES GRID SECTION ===== */}
          <div className="mb-20">
            <SectionHeader 
              label="Things to Do" 
              title="Activities & Experiences"
              subtitle="Unforgettable adventures await you"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-safari/10 flex items-center justify-center text-primary shrink-0 group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all">
                    {iconMap[activity.iconName] || <Camera className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">{activity.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{activity.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">
                      {activity.duration}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== TWO COLUMN: SIDEBAR INFO ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* When to Visit - Enhanced */}
            <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 border border-border hover:shadow-card transition-all">
              <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                When to Visit
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-safari/20 to-safari/5 rounded-xl border border-safari/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-safari fill-safari" />
                    <span className="font-medium text-foreground text-sm">Peak Season</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{destination.bestTime.peak.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl border border-primary/15">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-medium text-foreground text-sm">Good Season</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{destination.bestTime.good.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                    <span className="font-medium text-foreground text-sm">Low Season</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{destination.bestTime.low.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Weather - Enhanced */}
            <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 border border-border hover:shadow-card transition-all">
              <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ThermometerSun className="w-5 h-5 text-primary" />
                </div>
                Weather
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl text-center border border-primary/20">
                  <Sun className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Dry Season</p>
                  <p className="text-xs font-semibold text-foreground">{destination.weather.dry}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl text-center border border-secondary/20">
                  <CloudRain className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Wet Season</p>
                  <p className="text-xs font-semibold text-foreground">{destination.weather.wet}</p>
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-safari/10 rounded-xl border border-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Temperature Range</p>
                <p className="font-bold text-foreground">{destination.weather.temp}</p>
              </div>
            </div>

            {/* Getting There - Enhanced */}
            <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-6 border border-border hover:shadow-card transition-all">
              <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                Getting There
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">By Road</p>
                    <p className="text-xs text-muted-foreground">{destination.gettingThere.byRoad}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <Plane className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">By Air</p>
                    <p className="text-xs text-muted-foreground">{destination.gettingThere.byAir}</p>
                  </div>
                </div>
              </div>
              {/* Pro Tip Card */}
              <div className="mt-4 p-3 bg-gradient-to-r from-safari/15 to-safari/5 rounded-xl border border-safari/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-safari" />
                  <span className="text-xs font-semibold text-safari">Pro Tip</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Book a scenic flight for amazing aerial views of the landscape!
                </p>
              </div>
            </div>
          </div>

          {/* ===== WHERE TO STAY - PREMIUM GRID ===== */}
          <div className="mb-20">
            <SectionHeader 
              label="Accommodation" 
              title="Where to Stay"
              subtitle="Hand-picked lodges and camps for every budget"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {destination.lodges.map((lodge, index) => {
                const isOurPick = index === 0;
                
                return (
                  <div 
                    key={index} 
                    className={`group relative p-6 rounded-2xl border transition-all hover:shadow-elevated ${
                      isOurPick 
                        ? 'bg-gradient-to-br from-primary/5 via-card to-card border-primary/30' 
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                  >
                    {/* Our Pick Badge */}
                    {isOurPick && (
                      <div className="absolute -top-3 left-4">
                        <Badge className="bg-safari text-white gap-1">
                          <Award className="w-3 h-3" />
                          Our Pick
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{lodge.name}</h3>
                        <span className="text-xs text-primary font-medium">{lodge.type}</span>
                      </div>
                      {/* Price Range Visual */}
                      <div className="flex items-center gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg font-bold ${
                              i < lodge.priceRange.length ? 'text-primary' : 'text-muted-foreground/30'
                            }`}
                          >
                            $
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{lodge.description}</p>
                    
                    {/* View Lodge CTA on Hover */}
                    <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== PHOTO GALLERY - REPOSITIONED ===== */}
          <div className="mb-20">
            <SectionHeader 
              label="Gallery" 
              title={`${destination.name} in Pictures`}
              subtitle="Visual inspiration for your upcoming adventure"
            />
            <PhotoGallery images={galleryImages} />
          </div>

          {/* ===== INSIDER TIPS + QUICK FACTS ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {/* Insider Tips */}
            <div className="bg-gradient-to-br from-safari/10 via-safari/5 to-transparent rounded-2xl p-6 border border-safari/20">
              <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-safari/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-safari" />
                </div>
                Insider Tips
              </h3>
              <ul className="space-y-3">
                {destination.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                    <Star className="w-4 h-4 text-safari fill-safari shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-2xl p-6 border border-primary/10">
              <h3 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {destination.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{fact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RELATED PACKAGES - ENHANCED ===== */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">Safari Packages</span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                  {destination.name} Adventures
                </h2>
              </div>
              <Link to="/#destinations" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
                View all packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Horizontal Scroll Carousel */}
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4">
              {relatedPackages.map((pkg, index) => (
                <Link 
                  key={pkg.id} 
                  to={`/package/${pkg.slug}`} 
                  className="group flex-shrink-0 w-72 lg:w-auto bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elevated transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                      style={{ backgroundImage: `url(${pkg.images?.[0] || '/placeholder.svg'})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Most Booked Badge */}
                    {index === 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-safari text-white gap-1 text-[10px]">
                          <TrendingUp className="w-3 h-3" />
                          Most Booked
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
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
            
            {/* Mobile View All Link */}
            <div className="text-center mt-6 lg:hidden">
              <Link to="/#destinations" className="inline-flex items-center gap-2 text-primary font-semibold">
                View all packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== EXPLORE MORE DESTINATIONS ===== */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Keep Exploring</span>
            <h2 className="font-display text-xl font-bold text-foreground mt-2">
              More Destinations
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {destinationPreviews
              .filter(d => d.slug !== destinationSlug)
              .map((dest) => (
                <Link
                  key={dest.slug}
                  to={`/destination/${dest.slug}`}
                  className="flex items-center gap-2 bg-card hover:bg-primary/10 border border-border hover:border-primary/30 rounded-full px-4 py-2.5 transition-all group shadow-sm hover:shadow-card"
                >
                  <div className="w-7 h-7 rounded-full bg-cover bg-center border border-border" style={{ backgroundImage: `url(${dest.image})` }} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {dest.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ===== ENHANCED FLOATING CTA BAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-elevated p-3 md:p-4">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Desktop: Show destination info + pricing */}
          <div className="hidden sm:flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl bg-cover bg-center border border-border hidden md:block" 
              style={{ backgroundImage: `url(${destination.heroImage})` }} 
            />
            <div>
              <p className="font-bold text-foreground">{destination.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <span>Best: {destination.bestTime.peak[0]} - {destination.bestTime.peak[destination.bestTime.peak.length - 1]}</span>
                {minPrice && minPrice > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-primary font-semibold">From ${minPrice.toLocaleString()}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* WhatsApp Button */}
            <a 
              href={`https://wa.me/254700000000?text=Hi! I'm interested in visiting ${destination.name}. Can you help me plan my safari?`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted hover:bg-safari/10 hover:border-safari/30 transition-colors flex-1 sm:flex-none"
            >
              <MessageCircle className="w-4 h-4 text-safari" />
              <span className="text-sm font-medium text-foreground hidden md:inline">WhatsApp</span>
            </a>
            
            {/* Call Button */}
            <a 
              href="tel:+254700000000" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted hover:bg-muted/80 transition-colors sm:flex-none"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground hidden md:inline">Call Us</span>
            </a>
            
            {/* Primary CTA with Pulse */}
            <Link 
              to="/quote" 
              className="btn-gold flex-1 sm:flex-none text-center py-2.5 px-6 animate-pulse hover:animate-none"
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
