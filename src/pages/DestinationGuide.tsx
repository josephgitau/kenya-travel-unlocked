import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, Users, Sun, CloudRain, Camera, Binoculars, Home, Utensils, Car, Plane, Moon, Mountain, Fish, Ship, Footprints, Wind, TreeDeciduous, Droplets, Shield, Bike } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import JourneyBreadcrumb from '@/components/JourneyBreadcrumb';
import { destinationPreviews } from '@/data/destinations';
import SEO from '@/components/SEO';
import { usePackages } from '@/hooks/usePackages';
import { destinationsData } from '@/data/destinations';

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
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Destination Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The destination you're looking for doesn't exist.
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

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${destination.name} Safari Guide | Awili Safaris`}
        description={destination.description.substring(0, 160)}
        keywords={`${destination.name} safari, ${destination.name} Kenya, ${destination.name} wildlife, Kenya safari destination`}
      />
      <Header />

      {/* Journey Breadcrumb with sibling destinations */}
      <JourneyBreadcrumb 
        items={[
          { label: 'Destinations', href: '/destinations' },
          { label: destination.name }
        ]}
        siblings={destinationPreviews
          .filter(d => d.slug !== destinationSlug)
          .slice(0, 4)
          .map(d => ({ label: d.name, href: `/destination/${d.slug}` }))
        }
      />

      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${destination.heroImage})` }} />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              Destination Guide
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{destination.name}</h1>
            <p className="text-xl text-white/90 mb-6">{destination.tagline}</p>
          </div>
        </div>
      </section>

      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-6 px-4 text-center">
              <Sun className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Best Time</p>
              <p className="font-semibold text-foreground">{destination.bestTime.peak.slice(0, 2).join(', ')}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Binoculars className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Wildlife</p>
              <p className="font-semibold text-foreground">{destination.wildlife.length}+ Species</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Car className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">From Nairobi</p>
              <p className="font-semibold text-foreground">{destination.gettingThere.fromNairobi.split(',')[0]}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Home className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Lodges</p>
              <p className="font-semibold text-foreground">{destination.lodges.length}+ Options</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{destination.description}</p>
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-3">History & Background</h3>
                  <p className="text-muted-foreground">{destination.history}</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">Wildlife Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.wildlife.map((animal, index) => (
                    <div key={index} className="bg-card rounded-2xl p-6 shadow-card border border-border">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{animal.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{animal.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Best: {animal.bestTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">Things to Do</h2>
                <div className="space-y-4">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card border border-border">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        {iconMap[activity.iconName] || <Binoculars className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{activity.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{activity.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">Where to Stay</h2>
                <div className="space-y-4">
                  {destination.lodges.map((lodge, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-card rounded-2xl shadow-card border border-border">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{lodge.name}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{lodge.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lodge.description}</p>
                      </div>
                      <span className="text-primary font-bold shrink-0">{lodge.priceRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Best Time to Visit</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-safari" />
                      <span className="font-medium text-foreground">Peak Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">{destination.bestTime.peak.join(', ')}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">Good Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">{destination.bestTime.good.join(', ')}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="font-medium text-foreground">Low Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">{destination.bestTime.low.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Weather & Climate</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Dry Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.dry}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CloudRain className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Wet Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.wet}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground"><strong>Temperature:</strong> {destination.weather.temp}</p>
                  </div>
                </div>
              </div>

              <div className="bg-safari/5 rounded-3xl p-6 lg:p-8 border border-safari/20">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Insider Tips</h3>
                <ul className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-safari shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Getting There</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">By Road</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byRoad}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">By Air</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byAir}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-3xl p-6 lg:p-8 text-center">
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">Ready to Explore {destination.name}?</h3>
                <p className="text-primary-foreground/80 text-sm mb-6">Let us plan your perfect safari experience</p>
                <Link to="/quote" className="btn-safari bg-background text-foreground inline-block">Get Instant Quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedPackages && relatedPackages.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8">{destination.name} Safari Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <Link key={pkg.id} to={`/package/${pkg.slug}`} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url(${pkg.images[0] || '/placeholder.svg'})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4 price-tag">${pkg.price_non_resident.toLocaleString()}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{pkg.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{pkg.duration}</span>
                      <span>•</span>
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationGuide;
