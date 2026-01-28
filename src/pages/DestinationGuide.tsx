import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Star, Users, Sun, CloudRain, Camera, Binoculars, 
  Home, Utensils, Car, Plane, Moon, Mountain, Fish, Ship, Footprints, Wind, 
  TreeDeciduous, Droplets, Shield, Bike, ChevronRight, Sparkles, TrendingUp,
  Calendar, ThermometerSun, Eye, Heart, Share2, CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import PhotoGallery from '@/components/PhotoGallery';
import SEO from '@/components/SEO';
import { usePackages } from '@/hooks/usePackages';
import { destinationsData, destinationPreviews } from '@/data/destinations';
import { useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'wildlife' | 'activities' | 'stay'>('overview');

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
            The destination you're looking for doesn't exist or may have been moved.
          </p>
          <Link to="/destinations" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
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
        keywords={`${destination.name} safari, ${destination.name} Kenya, ${destination.name} wildlife, Kenya safari destination`}
      />
      <Header />

      {/* Hero Section - Full Immersive */}
      <section className="relative h-[75vh] lg:h-[85vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[pulse_20s_ease-in-out_infinite]" 
          style={{ backgroundImage: `url(${destination.heroImage})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Floating Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container mx-auto px-4 lg:px-8">
            <JourneyBreadcrumb 
              items={[
                { label: 'Destinations', href: '/destinations' },
                { label: destination.name }
              ]}
              variant="floating"
              siblings={destinationPreviews
                .filter(d => d.slug !== destinationSlug)
                .slice(0, 4)
                .map(d => ({ label: d.name, href: `/destination/${d.slug}` }))
              }
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-8 lg:pb-12">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                {destination.category === 'safari' ? 'Safari Destination' : 
                 destination.category === 'beach' ? 'Beach Paradise' : 
                 destination.category === 'rift-valley' ? 'Rift Valley' : 'Adventure'}
              </span>
              <span className="text-white/60 text-sm">Kenya</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {destination.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              {destination.tagline}
            </p>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white">
                <Sun className="w-4 h-4 text-primary" />
                <span className="text-sm">Best: {destination.bestTime.peak[0]}-{destination.bestTime.peak[destination.bestTime.peak.length - 1]}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white">
                <Binoculars className="w-4 h-4 text-primary" />
                <span className="text-sm">{destination.wildlife.length} Wildlife Species</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white">
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm">{destination.lodges.length} Accommodations</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/quote" className="btn-gold text-base px-8 py-4 shadow-lg">
                Plan Your Visit
              </Link>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-6 py-4 rounded-full transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="bg-card border-b border-border sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 divide-x divide-border">
            <div className="py-4 px-4 text-center">
              <ThermometerSun className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-semibold text-foreground text-sm">{destination.weather.temp.split(' ')[0]}</p>
            </div>
            <div className="py-4 px-4 text-center">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">Peak Season</p>
              <p className="font-semibold text-foreground text-sm">{destination.bestTime.peak[0].slice(0, 3)} - {destination.bestTime.peak[destination.bestTime.peak.length - 1].slice(0, 3)}</p>
            </div>
            <div className="py-4 px-4 text-center">
              <Car className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">From Nairobi</p>
              <p className="font-semibold text-foreground text-sm">{destination.gettingThere.fromNairobi.split(',')[0]}</p>
            </div>
            <div className="py-4 px-4 text-center hidden md:block">
              <Eye className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">Wildlife</p>
              <p className="font-semibold text-foreground text-sm">{destination.wildlife.length} Species</p>
            </div>
            <div className="py-4 px-4 text-center hidden lg:block">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs text-muted-foreground">Activities</p>
              <p className="font-semibold text-foreground text-sm">{destination.activities.length} Experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-1 py-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'wildlife', label: 'Wildlife', icon: Binoculars },
              { id: 'activities', label: 'Things to Do', icon: Camera },
              { id: 'stay', label: 'Where to Stay', icon: Home },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* Description Card */}
                  <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      About {destination.name}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                      {destination.description}
                    </p>
                    
                    {/* History Section */}
                    <div className="bg-gradient-to-br from-primary/5 to-safari/5 rounded-2xl p-6 border border-primary/10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg mb-2">History & Heritage</h3>
                          <p className="text-muted-foreground">{destination.history}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                        Photo Gallery
                      </h2>
                      <span className="text-sm text-muted-foreground">{galleryImages.length} photos</span>
                    </div>
                    <PhotoGallery images={galleryImages} />
                  </div>

                  {/* Quick Facts Grid */}
                  <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Quick Facts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.facts.map((fact, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <p className="text-muted-foreground text-sm">{fact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Wildlife Tab */}
              {activeTab === 'wildlife' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      Wildlife Highlights
                    </h2>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {destination.wildlife.length} species
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {destination.wildlife.map((animal, index) => (
                      <div 
                        key={index} 
                        className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {animal.name}
                            </h3>
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Binoculars className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{animal.description}</p>
                          <div className="flex items-center gap-2 text-sm bg-muted rounded-full px-3 py-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Best viewing: <strong className="text-foreground">{animal.bestTime}</strong></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities Tab */}
              {activeTab === 'activities' && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    Things to Do
                  </h2>
                  
                  <div className="space-y-4">
                    {destination.activities.map((activity, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start gap-5 p-6 bg-card rounded-2xl shadow-card border border-border hover:shadow-elevated hover:border-primary/20 transition-all"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-safari/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                          {iconMap[activity.iconName] || <Binoculars className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {activity.name}
                            </h3>
                            <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold shrink-0">
                              {activity.duration}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stay Tab */}
              {activeTab === 'stay' && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    Where to Stay
                  </h2>
                  
                  <div className="space-y-4">
                    {destination.lodges.map((lodge, index) => (
                      <div 
                        key={index} 
                        className="group p-6 bg-card rounded-2xl shadow-card border border-border hover:shadow-elevated transition-all"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {lodge.name}
                              </h3>
                              <span className="text-xs bg-safari/10 text-safari px-3 py-1 rounded-full font-semibold">
                                {lodge.type}
                              </span>
                            </div>
                            <p className="text-muted-foreground">{lodge.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-2xl font-bold text-primary">{lodge.priceRange}</div>
                            <p className="text-xs text-muted-foreground">per night</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Best Time Card */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border sticky top-48">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Best Time to Visit
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-safari/10 rounded-2xl border border-safari/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-safari" />
                      <span className="font-semibold text-foreground">Peak Season</span>
                      <Star className="w-4 h-4 text-safari fill-safari ml-auto" />
                    </div>
                    <p className="text-sm text-muted-foreground">{destination.bestTime.peak.join(', ')}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-semibold text-foreground">Good Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{destination.bestTime.good.join(', ')}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="font-semibold text-foreground">Low Season</span>
                      <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full ml-auto">Budget deals</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{destination.bestTime.low.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Weather Card */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-primary" />
                  Weather & Climate
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                    <Sun className="w-6 h-6 text-amber-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Dry Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.dry}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                    <CloudRain className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Wet Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.wet}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-xl text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Temperature Range</p>
                    <p className="font-bold text-foreground">{destination.weather.temp}</p>
                  </div>
                </div>
              </div>

              {/* Insider Tips */}
              <div className="bg-gradient-to-br from-safari/10 to-primary/5 rounded-3xl p-6 lg:p-8 border border-safari/20">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-safari" />
                  Insider Tips
                </h3>
                <ul className="space-y-4">
                  {destination.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-safari/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Star className="w-3 h-3 text-safari fill-safari" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Getting There */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Getting There
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Car className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">By Road</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byRoad}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Plane className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">By Air</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byAir}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary via-primary to-safari rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white" />
                  <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-2 border-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
                    Ready to Explore?
                  </h3>
                  <p className="text-primary-foreground/80 text-sm mb-6">
                    Let us plan your perfect {destination.name} safari experience
                  </p>
                  <Link to="/quote" className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg">
                    Get Instant Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {destination.name} Safari Packages
                </h2>
                <p className="text-muted-foreground">Curated experiences for your adventure</p>
              </div>
              <Link to="/#destinations" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:underline">
                View all packages
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <Link 
                  key={pkg.id} 
                  to={`/package/${pkg.slug}`} 
                  className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                      style={{ backgroundImage: `url(${pkg.images?.[0] || '/placeholder.svg'})` }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                      ${pkg.price_non_resident.toLocaleString()}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        {pkg.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        {pkg.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore Other Destinations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Explore Other Destinations
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {destinationPreviews
              .filter(d => d.slug !== destinationSlug)
              .slice(0, 6)
              .map((dest) => (
                <Link
                  key={dest.slug}
                  to={`/destination/${dest.slug}`}
                  className="group flex items-center gap-3 bg-card hover:bg-primary/5 border border-border hover:border-primary/20 rounded-full px-5 py-3 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${dest.image})` }} />
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {dest.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationGuide;
