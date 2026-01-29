import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, MapPin, Users, Car, Camera, Utensils, Home, ChevronRight, Loader2, Coffee, Sun, Moon, Bed } from 'lucide-react';
import { usePackages } from '@/hooks/usePackages';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { ItineraryDay } from '@/types/database';

const ItinerarySection = () => {
  const { data: packages, isLoading, error } = usePackages();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get top 4 packages sorted by rating
  const featuredPackages = packages
    ?.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4) || [];

  const selectedPackage = featuredPackages[selectedIndex];

  const includedIcons: Record<string, typeof Car> = {
    'transport': Car,
    'vehicle': Car,
    '4x4': Car,
    'cruiser': Car,
    'accommodation': Home,
    'lodge': Home,
    'camp': Home,
    'hotel': Home,
    'meal': Utensils,
    'breakfast': Utensils,
    'lunch': Utensils,
    'dinner': Utensils,
    'park': Camera,
    'entry': Camera,
    'fee': Camera,
    'guide': Users,
    'driver': Users,
  };

  const getIconForIncluded = (text: string) => {
    const lowerText = text.toLowerCase();
    for (const [keyword, Icon] of Object.entries(includedIcons)) {
      if (lowerText.includes(keyword)) return Icon;
    }
    return Check;
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (error || !featuredPackages.length) {
    return null;
  }

  return (
    <section id="itinerary" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Featured Itineraries
          </span>
          <h2 className="section-title mt-2">Explore Our Safari Journeys</h2>
          <p className="section-subtitle mt-4 max-w-2xl mx-auto">
            Preview day-by-day experiences from our most popular packages
          </p>
        </div>

        {/* Package Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="overflow-x-auto max-w-full pb-2 scrollbar-hide">
            <Tabs value={String(selectedIndex)} onValueChange={(v) => setSelectedIndex(Number(v))}>
              <TabsList className="bg-background/80 backdrop-blur-sm border border-border p-1 h-auto gap-1 flex-wrap justify-center">
                {featuredPackages.map((pkg, index) => (
                  <TabsTrigger
                    key={pkg.id}
                    value={String(index)}
                    className={cn(
                      "px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
                    )}
                  >
                    {pkg.name.length > 25 ? `${pkg.name.substring(0, 25)}...` : pkg.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Itinerary Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{selectedPackage.location}</span>
              <span className="text-muted-foreground">•</span>
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">{selectedPackage.duration}</span>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {selectedPackage.itinerary.map((item: ItineraryDay, index: number) => (
                <div key={item.day} className="relative pl-12 pb-8 last:pb-0">
                  {/* Timeline Line */}
                  {index !== selectedPackage.itinerary.length - 1 && (
                    <div className="absolute left-[18px] top-10 w-0.5 h-[calc(100%-24px)] bg-gradient-to-b from-primary/50 to-border" />
                  )}
                  
                  {/* Day Marker */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold shadow-lg ring-4 ring-background">
                    {item.day}
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow duration-300">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.highlights.map((highlight: string) => (
                          <span
                            key={highlight}
                            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Meals & Accommodation Badges */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border/50">
                      {item.meals && item.meals.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-muted-foreground" />
                          <div className="flex gap-1">
                            {item.meals.map((meal: string) => (
                              <span 
                                key={meal} 
                                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                              >
                                {meal}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.accommodation && (
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {item.accommodation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card/90 backdrop-blur-md rounded-3xl p-6 lg:p-8 shadow-card border border-border lg:sticky lg:top-32">
              {/* What's Included */}
              <h3 className="font-display text-xl font-bold text-foreground mb-5">
                What's Included
              </h3>
              
              <div className="space-y-3 mb-6">
                {selectedPackage.included.slice(0, 5).map((item: string) => {
                  const Icon = getIconForIncluded(item);
                  return (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  );
                })}
                {selectedPackage.included.length > 5 && (
                  <p className="text-xs text-muted-foreground pl-12">
                    +{selectedPackage.included.length - 5} more included
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="border-t border-border pt-5 mb-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Starting From</p>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Kenyan Resident</span>
                    <span className="font-display text-xl font-bold text-foreground">
                      KES {selectedPackage.price_resident.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Non-Resident</span>
                    <span className="font-display text-xl font-bold text-foreground">
                      USD {selectedPackage.price_non_resident.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Per person sharing. Single supplement available.
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Button asChild className="w-full btn-gold">
                  <Link to={`/packages/${selectedPackage.slug}`}>
                    View Full Package
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Request Quote
                </Button>
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                No payment required now
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
