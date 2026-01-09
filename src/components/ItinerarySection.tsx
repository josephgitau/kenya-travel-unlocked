import { Check, Clock, MapPin, Users, Car, Camera, Utensils, Home } from 'lucide-react';

const ItinerarySection = () => {
  const itinerary = [
    {
      day: 1,
      title: 'Nairobi to Maasai Mara',
      description: 'Depart Nairobi early morning via the Great Rift Valley. Arrive at the Mara for afternoon game drive.',
      highlights: ['Great Rift Valley viewpoint', 'Afternoon game drive', 'Sundowner experience'],
    },
    {
      day: 2,
      title: 'Full Day Game Drives',
      description: 'Full day exploring the reserve with morning and afternoon game drives to spot the Big 5.',
      highlights: ['Big 5 sightings', 'Mara River visit', 'Wildlife photography'],
    },
    {
      day: 3,
      title: 'Mara to Nairobi',
      description: 'Optional early morning game drive before breakfast. Depart for Nairobi arriving by evening.',
      highlights: ['Sunrise game drive', 'Maasai village visit', 'Return to Nairobi'],
    },
  ];

  const included = [
    { icon: Car, text: 'Transport in 4x4 Land Cruiser' },
    { icon: Home, text: 'Accommodation (2 nights)' },
    { icon: Utensils, text: 'All meals included' },
    { icon: Camera, text: 'Park entry fees' },
    { icon: Users, text: 'Professional driver guide' },
  ];

  return (
    <section id="itinerary" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Itinerary */}
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Sample Itinerary</span>
            <h2 className="section-title mt-2">3 Days Maasai Mara Safari</h2>
            <p className="section-subtitle mt-4 mb-10">
              Experience the iconic Maasai Mara with our most popular safari package.
            </p>

            {/* Timeline */}
            <div className="space-y-0">
              {itinerary.map((item, index) => (
                <div key={item.day} className="relative pl-8 pb-10 last:pb-0">
                  {/* Timeline Line */}
                  {index !== itinerary.length - 1 && (
                    <div className="absolute left-[11px] top-8 w-0.5 h-full bg-border" />
                  )}
                  
                  {/* Day Marker */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {item.day}
                  </div>
                  
                  {/* Content */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What's Included + Pricing */}
          <div>
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border sticky top-32">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                What's Included
              </h3>
              
              <div className="space-y-4 mb-8">
                {included.map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-border pt-6 mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-muted-foreground">Kenyan Resident</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    KES 25,000
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-muted-foreground">Non-Resident</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    USD 450
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Price per person sharing. Single supplement available.
                </p>
              </div>

              {/* CTA */}
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gold w-full text-center block"
              >
                Request Quote / Check Availability
              </a>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                No payment required now. Get a personalized quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;
