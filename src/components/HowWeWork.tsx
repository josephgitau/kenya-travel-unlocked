import { MapPin, Calculator, Plane } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MapPin,
    title: 'Choose Your Adventure',
    description: 'Browse our curated packages or tell us your dream safari vision. Bush, beach, or both—we have it all.',
  },
  {
    number: '02',
    icon: Calculator,
    title: 'Get a Custom Quote',
    description: 'We tailor everything to your budget, group size, and preferences. No hidden fees, no surprises.',
  },
  {
    number: '03',
    icon: Plane,
    title: 'Experience Kenya',
    description: 'Sit back as we handle every detail—from airport pickup to your final sunset. Just pack your bags.',
  },
];

const HowWeWork = () => {
  return (
    <section className="py-16 lg:py-20 bg-card border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Simple Process</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
            How We Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative text-center group"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-primary/10" />
              )}
              
              {/* Icon Container */}
              <div className="relative inline-flex mb-6">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
